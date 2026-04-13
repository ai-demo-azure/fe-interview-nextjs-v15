"use client";

import { useState } from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export const useInterview = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // Hàm bắt đầu buổi phỏng vấn
  const startInterview = () => {
    setIsStarted(true);
    // Có thể thêm lời chào mặc định từ AI ở đây
    setMessages([
      {
        role: "assistant",
        content:
          "Chào bạn! Tôi là người phỏng vấn của bạn hôm nay. Chúng ta bắt đầu nhé?",
      },
    ]);
  };

  // Hàm xử lý gửi tin nhắn (từ Mic hoặc từ Input tay)
  const handleSendMessage = async (text: string, onSuccess?: () => void) => {
    if (!text.trim()) return;

    // 1. Thêm tin nhắn của người dùng vào danh sách
    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);

    // 2. Gọi callback để xóa transcript ở component (nếu có)
    onSuccess?.();

    // 3. Giả lập AI đang xử lý (sau này sẽ thay bằng gọi API OpenAI)
    setIsAiTyping(true);

    try {
      // Giả lập delay 1.5 giây để giống như AI đang suy nghĩ
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const aiResponse: Message = {
        role: "assistant",
        content: `Đây là câu trả lời giả lập cho câu hỏi: "${text}". Bạn cần kết nối API OpenAI để nhận câu trả lời thật.`,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Lỗi khi gọi AI:", error);
    } finally {
      setIsAiTyping(false);
    }
  };

  return {
    isStarted,
    isAiTyping,
    messages,
    startInterview,
    handleSendMessage,
  };
};
