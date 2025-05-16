// components/Loader.tsx
const LoaderScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent" />
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default LoaderScreen;
