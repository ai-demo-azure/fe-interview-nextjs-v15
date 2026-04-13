import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/hooks/useInterview";

export const ChatList = ({ messages }: { messages: Message[] }) => {
  return (
    <ScrollArea className="flex-1 w-full max-w-2xl p-4 border-slate-800 rounded-2xl">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-6`}
        >
          <div
            className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
              msg.role === "user"
                ? "bg-blue-600 text-white rounded-tr-none"
                : "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700"
            }`}
          >
            <p className="text-sm md:text-base leading-relaxed">
              {msg.content}
            </p>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};
