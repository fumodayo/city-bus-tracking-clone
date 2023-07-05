"use client";

import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { IconType } from "react-icons";
import { useState } from "react";

interface RouterLegStepProps {
  type?: string;
  icon: IconType;
}

const RouterLegStep: React.FC<RouterLegStepProps> = ({ icon: Icon, type }) => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="
        flex 
        flex-row
        p-2
      "
    >
      <div>
        <Icon className="mr-2" size={40} />
      </div>
      <div>
        {type === "start" && (
          <div>
            <span className="text-base font-semibold">
              Điểm bắt đầu đi bộ đến trạm 322 Đống Đa
            </span>
            <p className="text-sm text-gray-400">Trạm 322 Đống Đa</p>
          </div>
        )}
        {type === "end" && (
          <div>
            <span className="text-base font-semibold">
              Xuống trạm Siêu thị Nguyễn Kim đi bộ tới điểm đích
            </span>
            <p className="text-sm text-gray-400">Trạm 322 Đống Đa</p>
          </div>
        )}
        {type === "bus" && (
          <div>
            <span className="text-base font-semibold">
              Đi xe bus từ trạm Đối diện 59 Hùng Vương đến trạm 10 Lý Thái Tổ
            </span>
            <p className="text-sm text-gray-400">
              Trạm 322 Đống Đa {"->"} Trạm 10 Lý Thái Tổ
            </p>
          </div>
        )}
        <div className="cursor-pointer mx-5 my-2">
          <div onClick={() => setOpen(!open)} className="flex flex-row">
            {open ? (
              <IoIosArrowDown size={20} />
            ) : (
              <IoIosArrowForward size={20} />
            )}
            <div className="text-sm">
              <p className="font-semibold">Chi tiết</p>
              <p className="my-1 text-gray-500">6 phút 22 giây</p>
            </div>
          </div>
          {open && type !== "bus" && (
            <div className="ml-10 my-2">
              <div className="text-sm text-mainColor font-semibold">
                Tiếp tục
              </div>
              <span className="ml-10 my-3 text-gray-500 text-sm">17.704m</span>
            </div>
          )}
          {open && type === "bus" && (
            <div className="ml-10 my-2">
              <div className="text-sm text-mainColor font-semibold">
                Đi từ: Trạm 102 Nguyễn Thị Minh Khai đến trạm 51 Nguyễn Thị Minh
                Khai
              </div>
              <span className="ml-10 my-3 text-gray-500 text-sm">20m</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RouterLegStep;
