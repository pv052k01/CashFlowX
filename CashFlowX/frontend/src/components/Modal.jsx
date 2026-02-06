import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-center z-50 w-full h-[calc(100vh-1rem)] max-h-full overflow-y-auto overflow-x-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative rounded-xl" style={{ backgroundColor: 'var(--bg-1)', border: '1px solid var(--card-ring)', boxShadow: '0 20px 48px rgba(0,0,0,0.6)' }}>
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t" style={{ borderColor: 'var(--card-ring)' }}>
            <h3 className="text-lg font-medium" style={{ color: 'var(--text-0)' }}>
              {title}
            </h3>
            <button
              type="button"
              className="rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center cursor-pointer"
              style={{ color: '#000', backgroundColor: '#fff' }}
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l12 12M13 1L1 13"
                />
              </svg>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
