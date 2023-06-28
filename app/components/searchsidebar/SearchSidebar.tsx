"use client";

import Image from "next/image";

import { BiSearchAlt2 } from "react-icons/bi";
import SecondaryTabs from "../sidebar/SecondaryTabs";

const SearchSidebar = () => {
  return (
    <div>
      <div
        className="
            inline-block 
            w-[90%] 
            shadow-[0px_0px_7px_2px_rgba(0,0,0,0.15)] 
            bg-white 
            relative 
            transition-all 
            duration-[2s] 
            ease-[ease] 
            m-4 
            px-0 
            py-2.5 
            rounded-[15px]"
      >
        <div className="w-full bg-[white] rounded text-left px-4 py-0 flex flex-row">
          <Image
            src={"/markerred.png"}
            width={30}
            height={30}
            alt="markderred"
          />
          <input
            className="w-full mx-2 focus:outline-none"
            placeholder="Nhập địa điểm xuất phát, hoặc click lên màn hình"
          />
          <div className="p-1">
            <BiSearchAlt2 size={20} />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-[300px] h-[1px] ml-8 my-4 bg-gray-300" />
          <Image className="ml-2 z-3" src="/swap.png" width={30} height={30} alt="swap" />
        </div>
        <div className="w-full bg-[white] rounded text-left px-4 py-0 flex flex-row">
          <Image
            src={"/markerblue.png"}
            width={30}
            height={30}
            alt="markerblue"
          />
          <input
            className="w-full mx-2 focus:outline-none"
            placeholder="Nhập địa điểm kết thúc, hoặc click lên màn hình"
          />
          <div className="p-1">
            <BiSearchAlt2 size={20} />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-semibold m-5">Số tuyến đi tối đa:</h1>
        <SecondaryTabs headingTab="1 tuyến" secondaryheadingTab="2 tuyến" />
      </div>
    </div>
  );
};

export default SearchSidebar;
