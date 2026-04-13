"use client";

import { InterviewHeader } from "@/components/InterviewHeader";
import { InterviewSession } from "@/components/InterviewSession";
import { StartScreen } from "@/components/StartScreen";
import { useInterview } from "@/hooks/useInterview";
import { useSpeechToText } from "@/hooks/useSpeechToText";

export default function InterviewPage() {
  const { isStarted, startInterview, messages } = useInterview();

  return (
    <main className="h-screen bg-slate-950 text-white flex flex-col">
      <InterviewHeader />

      <div className="flex-1 w-full relative overflow-hidden">
        {!isStarted ? (
          <div className="h-full flex items-center justify-center">
            <StartScreen onStart={startInterview} />
          </div>
        ) : (
          <div className="h-full w-full relative">
            <InterviewSession />
          </div>
        )}
      </div>
    </main>
  );
}
