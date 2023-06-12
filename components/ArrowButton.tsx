"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  open: boolean;
  iconOpen: IconType;
  iconClose: IconType;
}

const ArrowButton: React.FC<ButtonProps> = ({
  onClick,
  iconOpen: IconOpen,
  iconClose: IconClose,
  open,
}) => {
  return (
    <div
      className="
          w-8 
          h-20
          shadow-2xl
          bg-[#3597E4] 
          rounded-r-lg
          pt-3
        "
    >
      <button onClick={onClick} className="relative">
        {open
          ? IconOpen && <IconOpen size={25} className="absolute text-[white]" />
          : IconClose && (
              <IconClose size={25} className="absolute text-[white]" />
            )}
      </button>
    </div>
  );
};

export default ArrowButton;
