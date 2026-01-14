"use client";

import { useEffect } from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function DeleteConfirmationModal({
  isOpen,
  itemName,
  onConfirm,
  onCancel,
  isLoading = false,
}: DeleteConfirmationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          animation: "fadeIn 0.2s ease-out",
        }}
      >
        <div 
          className="bg-white rounded-xl shadow-2xl max-w-sm mx-4 p-6"
          style={{
            animation: "scaleIn 0.3s ease-out",
          }}
        >
          <h2 className="text-lg font-bold text-gray-900 mb-2">Confirm Deletion</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <span className="font-semibold">"{itemName}"</span>?
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-medium transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition disabled:opacity-50"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
