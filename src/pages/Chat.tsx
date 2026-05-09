import { useEffect, useMemo, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { requestGroqReply, type ChatMessage } from "@/utils/groq";
import { useI18n } from "@/context/I18nContext";
import LoadingPoints from "@/components/LoadingPoints";
import SettingsModal from "@/components/SettingsModal";
import type { AppLanguage } from "@/i18n/types";
import { useSettingsModal } from "@/context/SettingsModalContext";
const CHAT_STORAGE_KEY = "chatcore-messages";

export default function Chat() {
  const { language, setLanguage, t } = useI18n();
  const {
    isOpen: isSettingsOpen,
    close: closeSettings,
  } = useSettingsModal();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const rawMessages = localStorage.getItem(CHAT_STORAGE_KEY);
    if (rawMessages) {
      try {
        const parsed = JSON.parse(rawMessages) as ChatMessage[];
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      } catch {
        localStorage.removeItem(CHAT_STORAGE_KEY);
      }
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages, isHydrated]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  const canSend = useMemo(
    () => prompt.trim().length > 0 && !loading,
    [prompt, loading],
  );

  async function sendMessage() {
    const content = prompt.trim();
    if (!content || loading) return;

    const userMessage: ChatMessage = { role: "user", content };
    const nextMessages = [...messages, userMessage];

    setPrompt("");
    setError(null);
    setMessages(nextMessages);
    setLoading(true);

    try {
      const assistantText = await requestGroqReply(nextMessages, language);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantText },
      ]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t("chat.error.generic");
      setError(message);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function clearChat() {
    const shouldClear = window.confirm(t("chat.clearConfirm"));

    if (!shouldClear) return;

    setMessages([]);
    setPrompt("");
    setError(null);
    localStorage.removeItem(CHAT_STORAGE_KEY);
    closeSettings();
    inputRef.current?.focus();
  }

  return (
    <div className="flex h-full min-w-full flex-col justify-between">
      <div className="h-full min-w-full overflow-y-auto p-10 pb-4">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 pt-4">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm text-white ${
                message.role === "user"
                  ? "ml-auto bg-(--secondary-color)"
                  : "mr-auto bg-white/10"
              }`}
            >
              {message.content}
            </div>
          ))}

          {loading ? (
            <div>
              <LoadingPoints />
            </div>
          ) : null}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="w-full p-10 pt-4">
        <div className="mx-auto w-full max-w-4xl">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              name="prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void sendMessage();
                }
              }}
              className="w-full rounded-full bg-gray-800 p-4 px-6 pr-16 text-white outline-none ring-1 ring-white/10 placeholder:text-white/50 focus:ring-(--third-color) disabled:opacity-70"
              placeholder={t("chat.placeholder")}
            />

            <button
              type="button"
              onClick={() => void sendMessage()}
              disabled={!canSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-(--secondary-color) p-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={t("chat.send")}
            >
              <FaArrowUp />
            </button>
          </div>

          {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
        </div>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        language={language}
        languageLabel={t("lang.label")}
        title={t("settings.title")}
        clearChatLabel={t("chat.clear")}
        clearDisabled={loading || messages.length === 0}
        onClose={() => {
          closeSettings();
          inputRef.current?.focus();
        }}
        onLanguageChange={(nextLanguage: AppLanguage) => {
          setLanguage(nextLanguage);
        }}
        onClearChat={clearChat}
      />
    </div>
  );
}
