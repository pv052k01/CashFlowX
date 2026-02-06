import React, { useState } from 'react';
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-start md:flex-row gap-5 mb-6">
      <div 
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-400 rounded-lg">
          {icon ? (
            <img src={icon} alt="Icon" className="w-12 h-12" />
          ) : (
            <LuImage />
          )}
        </div>
        <p className="">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {isOpen && (
          <div className="relative">
            <button
              className="w-7 h-7 items-center justify-center rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
              style={{ backgroundColor: '#000', color: '#fff', border: '1px solid var(--card-ring)' }}
              onClick={() => setIsOpen(false)}
            >
              <LuX className="w-5 h-5" />
            </button>
            <EmojiPicker 
              open={isOpen}
              onEmojiClick={(emoji) => {
                onSelect(emoji?.imageUrl || "");
              }}
            />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;