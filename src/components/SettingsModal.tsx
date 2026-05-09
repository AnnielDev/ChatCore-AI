import type { AppLanguage } from "@/i18n/types";
import { IoClose } from "react-icons/io5";
type SettingsModalProps = {
  isOpen: boolean;
  language: AppLanguage;
  languageLabel: string;
  title: string;
  clearChatLabel: string;
  clearDisabled: boolean;
  onClose: () => void;
  onLanguageChange: (language: AppLanguage) => void;
  onClearChat: () => void;
};

export default function SettingsModal({
  isOpen,
  language,
  languageLabel,
  title,
  clearChatLabel,
  clearDisabled,
  onClose,
  onLanguageChange,
  onClearChat,
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0d1427] shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-[#0d1427] px-5 py-4">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/20 px-3 py-1 text-xs text-white/80 transition hover:bg-white/10"
          >
            <IoClose />
          </button>
        </div>

        <div className="max-h-[70vh] space-y-4 overflow-y-auto p-5">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <label className="mb-2 block text-xs text-white/70">
              {languageLabel}
            </label>
            <select
              value={language}
              onChange={(event) =>
                onLanguageChange(event.target.value as AppLanguage)
              }
              className="w-full rounded-lg border border-white/20 bg-[#111a30] px-3 py-2 text-sm text-white outline-none"
            >
              <option value="es">Espanol</option>
              <option value="en">English</option>
              <option value="pt">Portugues</option>
            </select>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <button
              type="button"
              onClick={onClearChat}
              disabled={clearDisabled}
              className="w-full rounded-lg border border-red-300/30 bg-red-400/10 px-3 py-2 text-sm font-medium text-red-200 transition hover:bg-red-400/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {clearChatLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
