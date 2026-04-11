import { FaArrowUp } from "react-icons/fa";
export default function Chat() {
  return (
    <div className="flex flex-col justify-between h-full min-w-full">
      <div className="h-full min-w-full p-10"></div>
      <div className="w-full p-10">
        <div>
          <input
            type="text"
            name="prompt"
            className="w-full rounded-full bg-gray-800 text-white p-4 px-6 pr-16"
            placeholder="Ask me anything about design, code or science..."
          />
          <button
            className="absolute cursor-pointer right-12 top-[calc(100%-5.5rem)] bg-(--secondary-color) 
          text-white p-3 rounded-full"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
}
