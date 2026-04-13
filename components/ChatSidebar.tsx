"use client";

import { MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatList } from "@/components/ChatList";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  messages: any[];
  transcript: string;
  setTranscript: (val: string) => void;
  onSend: () => void;
  isAiTyping: boolean;
}

export const ChatSidebar = ({
  isOpen,
  onClose,
  messages,
  transcript,
  setTranscript,
  onSend,
  isAiTyping,
}: ChatSidebarProps) => {
  return (
    <aside
      className={`fixed top-0 right-0 h-full w-[30%] min-w-[320px] bg-slate-900/90 backdrop-blur-xl border-l border-slate-800 transition-transform duration-500 ease-in-out z-40 flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header của Sidebar */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare size={18} className="text-blue-400" />
          <h2 className="font-semibold text-slate-200">Lịch sử phỏng vấn</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-800 rounded-full transition-colors"
        >
          <X size={20} className="text-slate-400" />
        </button>
      </div>

      {/* Danh sách tin nhắn */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <ChatList messages={messages} />
      </div>

      {/* Input hỗ trợ gõ tay */}
      <div className="p-4 bg-slate-900/50 border-t border-slate-800">
        <div className="flex gap-2 bg-slate-800 p-2 rounded-xl border border-slate-700 focus-within:border-blue-500 transition-all">
          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            placeholder="Nhập câu trả lời..."
            className="flex-1 bg-transparent border-none outline-none text-sm px-2 py-1 text-white"
          />
          <Button
            onClick={onSend}
            disabled={!transcript.trim() || isAiTyping}
            className="h-10 w-10 p-0 rounded-lg bg-blue-600 hover:bg-blue-700 shrink-0"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </aside>
  );
};
