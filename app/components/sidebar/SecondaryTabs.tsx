"use client";

import { useState } from "react";

import { IconType } from "react-icons";

import qs from "query-string";
import { useRouter } from "next/navigation";

enum OPTIONS {
  TAB_1 = 0,
  TAB_2 = 1,
}

interface SecondaryTabsProps {
  headingTab: string;
  secondaryheadingTab: String;
  headingTabContent?: React.ReactNode;
  secondaryHeadingTabContent?: React.ReactNode;
  iconFirst?: IconType;
  iconSecond?: IconType;
  isSidebarType?: boolean;
}

const SecondaryTabs: React.FC<SecondaryTabsProps> = ({
  headingTab,
  secondaryheadingTab,
  headingTabContent,
  secondaryHeadingTabContent,
  iconFirst: IconFirst,
  iconSecond: IconSecond,
  isSidebarType,
}) => {
  const [step, setStep] = useState(OPTIONS.TAB_1);
  const router = useRouter();

  const onChooseTAB_1 = () => {
    setStep(OPTIONS.TAB_1);
    if (isSidebarType) {
      const updatedQuery: any = {
        ["type"]: "route",
      };

      const url = qs.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    }
  };

  const onChooseTAB_2 = () => {
    setStep(OPTIONS.TAB_2);
    if (isSidebarType) {
      const updatedQuery: any = {
        ["type"]: "direction",
      };

      const url = qs.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    }
  };

  let bodyContent = headingTabContent;
  if (step === OPTIONS.TAB_2) {
    bodyContent = secondaryHeadingTabContent;
  }

  return (
    <>
      <div
        className=" 
        shadow-[0px_0px_7px_2px_rgba(0,0,0,0.15)]
        rounded-lg 
        flex 
        flex-row 
        m-5
        px-2 
        py-2
        justify-center 
        items-center
        text-sm
        font-bold
        text-gray-500
        cursor-pointer
      "
      >
        <div
          onClick={onChooseTAB_1}
          className={`
            w-[50%]
            p-3
            rounded-lg 
            justify-center 
            items-center
            flex
            ${step === OPTIONS.TAB_1 && "bg-primaryColor text-mainColor"}
          `}
        >
          {IconFirst && <IconFirst size={18} className="mr-1" />}
          {headingTab}
        </div>
        <div
          onClick={onChooseTAB_2}
          className={`
            w-[50%]
            p-3
            rounded-lg 
            justify-center 
            items-center
            flex
            ${step === OPTIONS.TAB_2 && "bg-primaryColor text-mainColor"}
        `}
        >
          {IconSecond && <IconSecond size={18} className="mr-1" />}
          {secondaryheadingTab}
        </div>
      </div>
      {bodyContent}
    </>
  );
};

export default SecondaryTabs;
