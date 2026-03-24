import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  message = 'Loading...',
}) => {
  const sizeClass = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div
        className={classNames(
          'animate-spin rounded-full border-4 border-gray-300 border-t-primary-600',
          sizeClass[size]
        )}
      />
      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message: string;
  retry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  retry,
}) => {
  return (
    <div className="rounded-lg border-2 border-red-200 bg-red-50 p-6">
      <h3 className="text-lg font-semibold text-red-900">{title}</h3>
      <p className="mt-2 text-red-700">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  action,
}) => {
  return (
    <div className="py-12 text-center">
      {icon && <div className="mb-4 flex justify-center text-4xl">{icon}</div>}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 rounded-lg bg-primary-600 px-6 py-2 font-semibold text-white hover:bg-primary-700"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
