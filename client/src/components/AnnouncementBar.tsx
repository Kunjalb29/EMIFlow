import { Zap, Shield, Clock } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-navy text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm">
        <span className="flex items-center gap-1.5">
          <Zap size={14} className="text-primary" />
          Flexible EMI plans
        </span>
        <span className="hidden sm:inline text-white/30">•</span>
        <span className="flex items-center gap-1.5">
          <Shield size={14} className="text-success" />
          Transparent pricing
        </span>
        <span className="hidden sm:inline text-white/30">•</span>
        <span className="hidden sm:flex items-center gap-1.5">
          <Clock size={14} className="text-warning" />
          Secure checkout
        </span>
      </div>
    </div>
  );
}
