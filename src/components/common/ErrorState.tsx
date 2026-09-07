import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Something went wrong while fetching products. Please check your network and try again.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-red-50/70 border border-red-200/80 rounded-2xl max-w-md mx-auto my-8">
      <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-red-950 mb-1">Failed to load</h3>
      <p className="text-sm text-red-700/90 mb-5 leading-relaxed">{message}</p>
      {onRetry && (
        <PrimaryButton
          variant="secondary"
          size="sm"
          onClick={onRetry}
          icon={<RefreshCw className="w-4 h-4" />}
        >
          Try Again
        </PrimaryButton>
      )}
    </div>
  );
};
