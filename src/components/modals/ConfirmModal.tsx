'use client'

import { createPortal } from "react-dom";
import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";
import { SortAscIcon, X } from "lucide-react";

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function DeleteModal({ open, onClose, children }: ConfirmModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // skip render on server

  return createPortal(
    <div
      onClick={onClose}
      className={clsx(
        "fixed inset-0 z-50 flex justify-center items-center transition-colors",
        open ? "visible bg-black/20" : "invisible"
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "relative bg-white rounded-xl shadow p-6 transition-all",
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <X />
        </button>
        <div className="text-center w-56">
          <SortAscIcon size={56} className="mx-auto text-blue-500" />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text--800 text-wrap">Sort Items</h3>
            <p className="text-sm text-gray-500 text-wrap">
              Are you sure you want to sort the items?
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
