import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      <p className="text-sm ">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs md:text-sm font-medium whitespace-nowrap border border-purple-100/50 hover:bg-purple-100 px-4 py-2 rounded-lg cursor-pointer  text-white bg-purple-500"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
