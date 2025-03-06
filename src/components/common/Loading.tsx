import React from 'react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
}

const LoadingExample: React.FC<LoadingProps> = ({
  size = 'medium',
  color = 'text-blue-600',
  text = 'Loading...',
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${color} ${sizeClasses[size]}`}
      />
      {text && <span className="text-gray-600">{text}</span>}
    </div>
  );
};

// Example usage
const Loading = () => {
  return (
    // <div className="space-y-8 p-8">
    //   <div>
    //     <h3 className="mb-4 text-lg font-medium">Small Loading</h3>
    //     <Loading size="small" color="text-green-600" text="Loading..." />
    //   </div>

    //   <div>
    //     <h3 className="mb-4 text-lg font-medium">Medium Loading</h3>
    <LoadingExample size="medium" color="text-blue-600" />
    //   </div>

    //   <div>
    //     <h3 className="mb-4 text-lg font-medium">Large Loading</h3>
    //     <Loading size="large" color="text-purple-600" text="Please wait..." />
    //   </div>
    // </div>
  );
};

export default Loading;
