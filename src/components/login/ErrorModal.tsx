export default function ErrorModal({ message, onClose }: { message: string; onClose?: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl max-w-sm w-full mx-4 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="mt-2 px-4 py-2 bg-[#6E6E6E] text-white rounded-xl hover:bg-[#5A5A5A] transition-colors"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
