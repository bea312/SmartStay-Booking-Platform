import type { FC, ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: FC<EmptyStateProps> = ({
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

export default EmptyState;
