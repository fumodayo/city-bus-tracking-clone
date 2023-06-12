"use client";

import { useCallback, useState } from "react";
import ArrowButton from "../ArrowButton";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";
import Heading from "../Heading";
import HeadCase from "./HeadCase";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <div className="flex flex-row fixed">
      {open && (
        <div
          className={`
            w-[27rem]
            h-screen
            shadow-2xl
            bg-white
            box-border
        `}
        >
          {/* HEADER */}
          <Heading title="Hệ thống xe buýt Đà Nẵng" />
          <HeadCase />
        </div>
      )}
      <ArrowButton
        onClick={onClose}
        iconOpen={VscTriangleLeft}
        iconClose={VscTriangleRight}
        open={open}
      />
    </div>
  );
};

export default Sidebar;
