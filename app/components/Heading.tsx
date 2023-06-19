"use client";

import { IconType } from "react-icons";

interface HeadingProps {
  title: string;
  onClick?: () => void;
  icon?: IconType;
}

const Heading: React.FC<HeadingProps> = ({ title, onClick, icon: Icon }) => {
  return (
    <div
      className="
        bg-[#3597E4] 
        px-3
        py-6
        h-20
        w-full
        text-lg
        text-white
        font-semibold
        flex
        justify-between
    "
    >
      <div className="float-left">{title}</div>
      <div className="float-right">
        <button onClick={onClick}>
          {Icon && (
            <Icon
              size={30}
              className="text-[white]"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Heading;
