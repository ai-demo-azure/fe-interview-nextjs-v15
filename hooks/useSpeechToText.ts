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
      let finalInEvent = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        // Truy cập an toàn vào dữ liệu transcript
        const result = event.results[i];
        const text = result[0]?.transcript || "";

        if (result.isFinal) {
          finalInEvent = text;
        } else {
          interim += text;
        }
      }

      // 1. Nếu có phần đã chốt, cập nhật vào transcript chính và xóa phần tạm
      if (finalInEvent) {
        setTranscript((prev) => (prev + " " + finalInEvent).trim());
        setInterimTranscript("");
      } else {
        // 2. Nếu đang nói, chỉ cập nhật phần tạm thời để hiển thị ngay lập tức
        setInterimTranscript(interim);
      }
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
