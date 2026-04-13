"use client";
import { useState, useEffect, useRef } from "react";

export const useSpeechToText = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
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
      let finalInEvent = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0] ? result[0].transcript : result.transcript;

        if (result.isFinal) {
          finalInEvent += text;
        }
      }
      if (finalInEvent)
        setTranscript((prev) => (prev + " " + finalInEvent).trim());
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
    setTranscript("");
    setIsListening(true);
    isListeningRef.current = true;
    recognitionRef.current?.start();
  };

  const stopListening = () => {
    setIsListening(false);
    isListeningRef.current = false;
    recognitionRef.current?.stop();
  };

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    setTranscript,
  };
};
