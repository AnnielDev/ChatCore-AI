import type { AppLanguage } from "@/i18n/types";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ApiMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type GroqResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

export function getGroqConfig() {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY as string | undefined;
  const model =
    (import.meta.env.VITE_GROQ_MODEL as string | undefined) || DEFAULT_MODEL;

  return { apiKey, model };
}

function getLanguageInstruction(language: AppLanguage) {
  if (language === "en") {
    return "Always answer in English, regardless of the user's input language.";
  }

  if (language === "pt") {
    return "Responda sempre em portugues, independentemente do idioma do usuario.";
  }

  return "Responde siempre en español, independientemente del idioma del usuario.";
}

export async function requestGroqReply(
  messages: ChatMessage[],
  language: AppLanguage,
) {
  const { apiKey, model } = getGroqConfig();

  if (!apiKey) {
    throw new Error("Falta VITE_GROQ_API_KEY en tu .env");
  }

  const apiMessages: ApiMessage[] = [
    {
      role: "system",
      content: getLanguageInstruction(language),
    },
    ...messages,
  ];

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: apiMessages,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al consultar Groq");
  }

  const data = (await response.json()) as GroqResponse;
  const assistantText = data?.choices?.[0]?.message?.content?.trim();

  if (!assistantText) {
    throw new Error("Groq no devolvio contenido");
  }

  return assistantText;
}
