"use client";

import { useState } from "react";
import ContentCase from "./ContentCase";

enum OPTIONS {
  LISTINGS = 0,
  SEARCHING = 1,
}

const HeadCase = () => {
  const [step, setStep] = useState(OPTIONS.LISTINGS);

  const onChooseListings = () => {
    setStep(OPTIONS.LISTINGS);
  };

  const onChooseSearching = () => {
    setStep(OPTIONS.SEARCHING);
  };

  let bodyContent = <ContentCase />;

  if (step === OPTIONS.SEARCHING) {
    bodyContent = <div>Searching</div>;
  }

  return (
    <div>
      <div
        className="
            w-full 
            flex 
            flex-row 
            text-mainColor
            px-4 
            py-2
            justify-center 
            items-center
            text-2xl
            cursor-pointer
        "
      >
        <div
          onClick={onChooseListings}
          className={`
            ${step === OPTIONS.LISTINGS && "border-b-2 border-b-[#3597E4]"}
            w-[50%]
            p-2
            justify-center 
            items-center
            flex
          `}
        >
          Tra cứu
        </div>
        <div
          onClick={onChooseSearching}
          className={`
            ${step === OPTIONS.SEARCHING && "border-b-2 border-b-[#3597E4]"}
            p-2
            w-[50%] 
            justify-center 
            items-center
            flex
          `}
        >
          Tìm tuyến
        </div>
      </div>
      {bodyContent}
    </div>
  );
};

export default HeadCase;
