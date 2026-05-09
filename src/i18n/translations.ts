import type { AppLanguage } from "@/i18n/types";

type TranslationKey =
  | "nav.chat"
  | "settings.title"
  | "settings.open"
  | "chat.placeholder"
  | "chat.thinking"
  | "chat.clear"
  | "chat.clearConfirm"
  | "chat.error.generic"
  | "chat.send"
  | "lang.label";

type TranslationMap = Record<AppLanguage, Record<TranslationKey, string>>;

export const translations: TranslationMap = {
  es: {
    "nav.chat": "Chat",
    "settings.title": "Configuracion",
    "settings.open": "Abrir configuracion",
    "chat.placeholder":
      "Preguntame lo que quieras sobre diseno, codigo o ciencia...",
    "chat.thinking": "Pensando...",
    "chat.clear": "Limpiar chat",
    "chat.clearConfirm": "Se borrara toda la conversacion. ¿Quieres continuar?",
    "chat.error.generic": "Ocurrio un error inesperado",
    "chat.send": "Enviar mensaje",
    "lang.label": "Idioma",
  },
  en: {
    "nav.chat": "Chat",
    "settings.title": "Settings",
    "settings.open": "Open settings",
    "chat.placeholder": "Ask me anything about design, code or science...",
    "chat.thinking": "Thinking...",
    "chat.clear": "Clear chat",
    "chat.clearConfirm": "The whole conversation will be deleted. Continue?",
    "chat.error.generic": "An unexpected error occurred",
    "chat.send": "Send message",
    "lang.label": "Language",
  },
  pt: {
    "nav.chat": "Chat",
    "settings.title": "Configuracoes",
    "settings.open": "Abrir configuracoes",
    "chat.placeholder":
      "Pergunte qualquer coisa sobre design, codigo ou ciencia...",
    "chat.thinking": "Pensando...",
    "chat.clear": "Limpar chat",
    "chat.clearConfirm": "Toda a conversa sera apagada. Deseja continuar?",
    "chat.error.generic": "Ocorreu um erro inesperado",
    "chat.send": "Enviar mensagem",
    "lang.label": "Idioma",
  },
};

export type { TranslationKey };
