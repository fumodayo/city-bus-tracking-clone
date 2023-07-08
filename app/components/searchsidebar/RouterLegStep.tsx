"use client";

import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { IconType } from "react-icons";
import { useState } from "react";
import {
  convertDurationDistance,
  convertDurationTime,
} from "@/app/utils/convertDuration";

interface RouterLegStepProps {
  type?: string;
  icon: IconType;
  locationNearStart?: {
    point: any;
  };
  locationNearEnd?: {
    point: any;
  };
  route?: any;
  walkingStart?: any;
  walkingEnd?: any;
}

const RouterLegStep: React.FC<RouterLegStepProps> = ({
  icon: Icon,
  type,
  locationNearStart,
  locationNearEnd,
  route,
  walkingStart,
  walkingEnd,
}) => {
  const [open, setOpen] = useState(true);

  let content = <div></div>;

  if (type === "start") {
    content = (
      <div>
        <span className="text-base font-semibold">
          Điểm bắt đầu đi bộ đến trạm {locationNearStart?.point.name}
        </span>
        <p className="text-sm text-gray-400">
          Trạm {locationNearStart?.point.name}
        </p>
        <div className="cursor-pointer mx-5 my-2">
          <div onClick={() => setOpen(!open)} className="flex flex-row">
            {open ? (
              <IoIosArrowDown size={20} />
            ) : (
              <IoIosArrowForward size={20} />
            )}
            <div className="text-sm">
              <p className="font-semibold">Chi tiết</p>
              <p className="my-1 text-gray-500">
                {convertDurationDistance(walkingStart?.distance)}
                {` (${convertDurationTime(walkingStart?.duration)})`}
              </p>
            </div>
          </div>
          {open && (
            <div>
              {walkingStart?.steps.map((step: any, index: number) => (
                <div className="ml-10 my-2" key={index}>
                  <div className="text-sm text-mainColor font-semibold">
                    {step.name}
                  </div>
                  <span className="ml-10 my-3 text-gray-500 text-sm">
                    {convertDurationDistance(step?.distance)}
                    {` (${convertDurationTime(step?.duration)})`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (type === "end") {
    content = (
      <div>
        <span className="text-base font-semibold">
          Xuống trạm {locationNearEnd?.point.name} đi bộ tới điểm đích
        </span>
        <p className="text-sm text-gray-400">
          Trạm {locationNearEnd?.point.name}
        </p>
        <div className="cursor-pointer mx-5 my-2">
          <div onClick={() => setOpen(!open)} className="flex flex-row">
            {open ? (
              <IoIosArrowDown size={20} />
            ) : (
              <IoIosArrowForward size={20} />
            )}
            <div className="text-sm">
              <p className="font-semibold">Chi tiết</p>
              <p className="my-1 text-gray-500">
                {convertDurationDistance(walkingEnd?.distance)}
                {` (${convertDurationTime(walkingEnd?.duration)})`}
              </p>
            </div>
          </div>
          {open && (
            <div>
              {walkingEnd?.steps.map((step: any, index: number) => (
                <div className="ml-10 my-2" key={index}>
                  <div className="text-sm text-mainColor font-semibold">
                    {step.name}
                  </div>
                  <span className="ml-10 my-3 text-gray-500 text-sm">
                    {convertDurationDistance(step?.distance)}
                    {` (${convertDurationTime(step?.duration)})`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (type === "bus") {
    content = (
      <div>
        <span className="text-base font-semibold">
          Đi xe bus từ trạm {locationNearStart?.point.name} đến trạm{" "}
          {locationNearEnd?.point.name}
        </span>
        <p className="text-sm text-gray-400">
          Trạm {locationNearStart?.point.name} {"->"} Trạm{" "}
          {locationNearEnd?.point.name}
        </p>
        <div className="cursor-pointer mx-5 my-2">
          <div onClick={() => setOpen(!open)} className="flex flex-row">
            {open ? (
              <IoIosArrowDown size={20} />
            ) : (
              <IoIosArrowForward size={20} />
            )}
            <div className="text-sm">
              <p className="font-semibold">Chi tiết</p>
              <p className="my-1 text-gray-500">
                {convertDurationDistance(route?.distance)}
                {` (${convertDurationTime(route?.duration)})`}
              </p>
            </div>
          </div>
          {open && (
            <div className="ml-10 my-2">
              <div className="text-sm text-mainColor font-semibold">
                Đi từ: Trạm {locationNearStart?.point.name} đến trạm{" "}
                {locationNearEnd?.point.name}
              </div>
              <span className="ml-10 my-3 text-gray-500 text-sm">
                {convertDurationDistance(route?.distance)}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="
        flex 
        flex-row
        p-2
      "
      >
        <Icon className="mr-2" size={40} />
        {content}
      </div>
    </>
  );
};

export default RouterLegStep;
