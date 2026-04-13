"use client";
import { useState, useEffect, useRef } from "react";

export const useSpeechToText = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Kiểm tra xem trình duyệt có hỗ trợ không
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true; // Nghe liên tục
      recognitionRef.current.interimResults = true; // Hiện kết quả tạm thời khi đang nói
      recognitionRef.current.lang = "vi-VN"; // Hoặc "en-US" nếu phỏng vấn tiếng Anh

      recognitionRef.current.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Lỗi nhận diện:", event.error);
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript("");
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    setTranscript,
  };
};
