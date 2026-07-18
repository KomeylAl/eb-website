import React from "react";
import { CgClose } from "react-icons/cg";

interface PopupProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Popup = ({ isOpen, children, onClose }: PopupProps) => {
  return (
    <div
      className={`w-full h-screen fixed top-0 right-0 flex items-center justify-center bg-black bg-opacity-40 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } transition-all duration-500 ease-in-out`}
    >
      <CgClose
        size={25}
        className="text-white top-10 right-10 fixed cursor-pointer z-20"
        onClick={onClose}
      />
      <div
        className={`p-8 relative overflow-hidden bg-gray-100 rounded-lg transform ${
          isOpen ? "scale-100" : "scale-95"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/25 -z-10 filter blur-3xl" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-violet-500/25 -z-10 filter blur-3xl" />
        {children}
      </div>
    </div>
  );
};

export default Popup;
