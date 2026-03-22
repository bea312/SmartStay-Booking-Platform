import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry, fullScreen }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto mt-16 animate-in fade-in zoom-in duration-300 ${fullScreen ? 'min-h-[60vh]' : ''}`}>
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-red-50">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
      
      <p className="text-gray-500 mb-8 max-w-sm">
        {message || 'An unexpected error occurred while loading this content.'}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all active:scale-95 shadow-sm"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
