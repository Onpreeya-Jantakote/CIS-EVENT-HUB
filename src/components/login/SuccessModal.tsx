export default function SuccessModal({ message, onClose }: { message: string; onClose?: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl max-w-sm w-full mx-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Success!</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="mt-2 px-4 py-2 bg-[#2192FF] text-white rounded-xl hover:bg-[#1E80D4] transition-colors"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
