"use client";
import { useState, useEffect, useRef } from "react";

export const useSpeechToText = () => {
  const [transcript, setTranscript] = useState(""); // Chữ đã chốt (final)
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState(""); // Chữ đang nghe (real-time)

  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "vi-VN";

    recognition.onresult = (event: any) => {
      let interim = "";
      let fullFinalTranscript = ""; // Biến chứa toàn bộ nội dung đã nói

      // Lặp từ đầu (0) đến hết để lấy toàn bộ dữ liệu hiện có trong bộ nhớ API
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0]?.transcript || "";
        if (result.isFinal) {
          fullFinalTranscript = text; // Gom tất cả các câu đã chốt lại
        } else {
          interim += text; // Gom các từ đang nghe dở
        }
        setInterimTranscript(interim);
      }

      // Cập nhật theo cách đơn giản của bạn: Ghi đè toàn bộ
      // if (fullFinalTranscript) {
      //   setTranscript(fullFinalTranscript.trim());
      //   setInterimTranscript("");
      // } else {
      // setInterimTranscript(interim);
      // }
      // Cập nhật cả hai cùng lúc
      setTranscript(fullFinalTranscript.trim());
      setInterimTranscript(interim); // Luôn cập nhật phần đang nói
    };

    recognition.onend = () => {
      if (isListeningRef.current) recognition.start();
    };
    recognition.onerror = (event: any) => {
      if (event.error !== "no-speech" && event.error !== "aborted") {
        setIsListening(false);
        isListeningRef.current = false;
      }
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript("");
      setInterimTranscript("");
      setIsListening(true);
      isListeningRef.current = true;
      recognitionRef.current?.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false);
      isListeningRef.current = false;
      recognitionRef.current?.stop();
      // Chốt nốt những gì đang nói dở vào transcript chính trước khi reset
      if (interimTranscript) {
        setTranscript((prev) => (prev + " " + interimTranscript).trim());
      }
      setInterimTranscript(""); // Xóa phần đang nói dở khi dừng
    }
  };

  return {
    transcript,
    interimTranscript,
    isListening,
    startListening,
    stopListening,
    setTranscript,
  };
};
