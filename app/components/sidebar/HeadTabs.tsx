"use client";

import { useState } from "react";

enum OPTIONS {
  TAB_1 = 0,
  TAB_2 = 1,
}

interface HeadTabsProps {
  headingTab: string;
  secondaryheadingTab: String;
  headingTabContent?: React.ReactElement;
  secondaryHeadingTabContent?: React.ReactElement;
}

const HeadTabs: React.FC<HeadTabsProps> = ({
  headingTab,
  secondaryheadingTab,
  headingTabContent,
  secondaryHeadingTabContent,
}) => {
  const [step, setStep] = useState(OPTIONS.TAB_1);

  const onChooseTAB_1 = () => {
    setStep(OPTIONS.TAB_1);
  };

  const onChooseTAB_2 = () => {
    setStep(OPTIONS.TAB_2);
  };

  let bodyContent = headingTabContent;

  if (step === OPTIONS.TAB_2) {
    bodyContent = secondaryheadingTab;
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
          onClick={onChooseTAB_1}
          className={`
            ${step === OPTIONS.TAB_1 && "border-b-2 border-b-[#3597E4]"}
            w-[50%]
            p-2
            justify-center 
            items-center
            flex
          `}
        >
          {headingTab}
        </div>
        <div
          onClick={onChooseTAB_2}
          className={`
            ${step === OPTIONS.TAB_2 && "border-b-2 border-b-[#3597E4]"}
            p-2
            w-[50%] 
            justify-center 
            items-center
            flex
          `}
        >
          {secondaryheadingTab}
        </div>
      </div>
      {bodyContent}
    </div>
  );
};

export default HeadTabs;
