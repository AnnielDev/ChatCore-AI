import type { ReactNode } from "react";
import type { ChatMessage as ChatMessageType } from "@/utils/groq";

type Props = {
  message: ChatMessageType;
};

function renderInline(content: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const parts = content.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  parts.forEach((part, index) => {
    if (!part) return;

    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      nodes.push(<strong key={`strong-${index}`}>{part.slice(2, -2)}</strong>);
      return;
    }

    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      nodes.push(<code key={`code-${index}`}>{part.slice(1, -1)}</code>);
      return;
    }

    nodes.push(part);
  });

  return nodes;
}

function renderAssistantMessage(content: string) {
  const lines = content.split(/\r?\n/);
  const elements: ReactNode[] = [];
  let listItems: ReactNode[] = [];
  let listType: "ul" | "ol" | null = null;

  const flushList = () => {
    if (listItems.length === 0 || !listType) return;

    if (listType === "ul") {
      elements.push(<ul key={`ul-${elements.length}`}>{listItems}</ul>);
    } else {
      elements.push(<ol key={`ol-${elements.length}`}>{listItems}</ol>);
    }

    listItems = [];
    listType = null;
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    const unorderedMatch = trimmed.match(/^[-*]\s+(.+)/);
    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)/);

    if (unorderedMatch) {
      if (listType && listType !== "ul") flushList();
      listType = "ul";
      listItems.push(
        <li key={`li-${listItems.length}`}>{renderInline(unorderedMatch[1])}</li>,
      );
      return;
    }

    if (orderedMatch) {
      if (listType && listType !== "ol") flushList();
      listType = "ol";
      listItems.push(
        <li key={`li-${listItems.length}`}>{renderInline(orderedMatch[1])}</li>,
      );
      return;
    }

    flushList();

    if (!trimmed) {
      return;
    }

    elements.push(<p key={`p-${elements.length}`}>{renderInline(trimmed)}</p>);
  });

  flushList();

  return elements.length > 0 ? elements : <p>{renderInline(content)}</p>;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`chat-message max-w-[92%] rounded-2xl px-4 py-3 text-sm text-white md:max-w-[85%] md:px-5 md:py-4 md:text-base ${
        isUser
          ? "chat-message-user ml-auto bg-(--secondary-color)"
          : "chat-message-assistant mr-auto bg-white/10"
      }`}
    >
      {isUser ? (
        <p className="m-0 whitespace-pre-wrap leading-relaxed">{message.content}</p>
      ) : (
        renderAssistantMessage(message.content)
      )}
    </div>
  );
}
