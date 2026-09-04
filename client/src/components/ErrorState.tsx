import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'Something went wrong',
  message = "We couldn't load this content right now. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mb-5">
        <AlertTriangle size={28} className="text-primary" />
      </div>
      <h2 className="text-xl font-bold text-text-primary mb-2">{title}</h2>
      <p className="text-sm text-text-secondary max-w-md mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium px-6 py-2.5 rounded-xl transition-colors"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      )}
    </div>
  );
}
