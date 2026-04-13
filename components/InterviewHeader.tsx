import { Sparkles, History, Power } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InterviewHeader = () => (
  <nav className="border-b border-slate-800 p-4 flex justify-between items-center bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
    <div className="flex items-center gap-2">
      <div className="bg-blue-600 p-1.5 rounded-lg">
        <Sparkles size={20} className="text-white" />
      </div>
      <span className="font-bold tracking-tight text-lg">AI Interview Pro</span>
    </div>
    <div className="flex gap-3">
      <Button variant="ghost" size="sm" className="text-slate-400">
        <History className="mr-2" size={16} /> Lịch sử
      </Button>
      <Button variant="destructive" size="sm">
        <Power className="mr-2" size={16} /> Kết thúc
      </Button>
    </div>
  </nav>
);
