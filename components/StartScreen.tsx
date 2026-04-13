import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const StartScreen = ({ onStart }: { onStart: () => void }) => (
  <Card className="p-8 bg-slate-900 border-slate-800 text-center max-w-md w-full shadow-2xl">
    <h2 className="text-2xl font-bold mb-4 text-white">Sẵn sàng phỏng vấn?</h2>
    <p className="text-slate-400 mb-6">
      Hôm nay bạn muốn luyện tập vị trí Frontend Developer (React/Next.js) đúng
      không?
    </p>
    <Button
      onClick={onStart}
      className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
    >
      Bắt đầu ngay
    </Button>
  </Card>
);
