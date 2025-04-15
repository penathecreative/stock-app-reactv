const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent"></div>
    </div>
  );
};

export default LoadingSpinner;
