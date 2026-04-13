"use client";
import { motion } from "framer-motion";

export const VoiceWaveform = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="flex items-end justify-center gap-1.5 h-20">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2.5 bg-blue-500 rounded-full"
          animate={isActive ? {
            height: [20, 60, 30, 70, 20],
          } : { height: 15 }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            delay: i * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};
