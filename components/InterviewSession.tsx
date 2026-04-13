"use client";

import { useState } from "react";
import { Mic, MessageSquare } from "lucide-react";
import { VoiceWaveform } from "@/components/VoiceWaveform";
import { ChatSidebar } from "@/components/ChatSidebar";
import { useSpeechToText } from "@/hooks/useSpeechToText";
import { useInterview } from "@/hooks/useInterview";

export const InterviewSession = () => {
  const [showChat, setShowChat] = useState(false);

  const { messages, isAiTyping, handleSendMessage } = useInterview();
  const {
    transcript,
    interimTranscript,
    isListening,
    startListening,
    stopListening,
    setTranscript,
  } = useSpeechToText();

  const onSend = () => {
    if (!transcript.trim()) return;
    handleSendMessage(transcript, () => {
      setTranscript("");
      if (isListening) stopListening();
    });
  };

  const handleStopAndSend = () => {
    stopListening(); // 1. Dừng mic

    // 2. Kiểm tra nếu có chữ thì mới gửi
    if (transcript.trim()) {
      handleSendMessage(transcript, () => {
        setTranscript(""); // Xóa chữ sau khi gửi thành công
      });
    }
  };

  return (
    // relative: để các nút con có thể dùng absolute định vị theo nó
    // w-full h-full: chiếm hết không gian vùng chứa
    <div className="w-full h-full flex bg-slate-950 text-white">
      {/* 1. NÚT ĐIỀU KHIỂN SIDEBAR CHAT */}
      <button
        onClick={() => setShowChat(true)}
        className="absolute top-6 right-6 flex items-center gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-all shadow-lg"
      >
        <span className="text-sm text-slate-400">Lịch sử</span>
        <MessageSquare size={20} className="text-blue-500" />
      </button>

      {/* 2. VÙNG TRUNG TÂM (HIỂN THỊ CHÍNH) */}
      {/* flex-1: chiếm hết không gian còn lại */}
      {/* items-center justify-center: đưa mọi thứ vào chính giữa */}
      <div
        className={`flex-1 flex flex-col h-full items-center justify-center transition-all duration-500 ${showChat ? "md:mr-[30%]" : ""}`}
      >
        {/* Vùng Waveform */}
        <div className="flex flex-col items-center gap-8 h-[60%]">
          <div className="w-64 h-64 flex items-center justify-center rounded-full border-2 border-slate-800 bg-slate-900 shadow-xl">
            <VoiceWaveform isActive={isListening || isAiTyping} />
          </div>

          <p className="text-slate-400 tracking-wide">
            {isAiTyping
              ? "AI đang trả lời..."
              : isListening
                ? "Đang lắng nghe..."
                : "Sẵn sàng phỏng vấn"}
          </p>
        </div>

        {/* Nút Mic và nội dung đang nói */}
        {/* absolute bottom-12: cách đáy 48px */}
        <div className="mb-2 flex flex-col items-center gap-4 w-full">
          {/* Hiển thị transcript khi đang nghe */}
          <div className="h-12 flex items-center justify-center">
            {isListening && (
              <div className="bg-slate-900/80 px-6 py-3 rounded-2xl border border-slate-800 animate-in fade-in zoom-in duration-300 shadow-2xl">
                <p className="text-center text-base italic leading-relaxed">
                  <span className="text-blue-400 font-medium">
                    {transcript}
                  </span>
                  <span className="text-slate-500 italic">
                    {interimTranscript ? ` ${interimTranscript}` : ""}
                  </span>
                  {!transcript && !interimTranscript && (
                    <span className="text-slate-500 animate-pulse">
                      Mời bạn nói...
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
          <button
            onClick={isListening ? handleStopAndSend : startListening}
            className={`w-20 h-20 flex items-center justify-center rounded-full transition-all shadow-lg ${
              isListening
                ? "bg-red-500 animate-pulse shadow-red-500/40"
                : "bg-blue-600 hover:scale-110 shadow-blue-600/40"
            }`}
          >
            <Mic size={32} />
          </button>
        </div>
      </div>
      {/* 3. SIDEBAR CHAT (COMPONENTS RIÊNG) */}
      <ChatSidebar
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        messages={messages}
        transcript={transcript}
        setTranscript={setTranscript}
        onSend={onSend}
        isAiTyping={isAiTyping}
      />
    </div>
  );
};
