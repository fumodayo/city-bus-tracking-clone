"use client";

import ReactSlider from "react-slider";

import { useCallback, useState } from "react";
import { SafeStations } from "../types";
import Steps from "./Steps";
import useFlyToStore from "@/app/hooks/useFlyStore";

interface ListingBusStopProps {
  listings: SafeStations[];
}

const ListingBusStop: React.FC<ListingBusStopProps> = ({ listings }) => {
  const { setCoordinates } = useFlyToStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const _handleSliderIndex = (key: number) => {
    setCurrentIndex(key);
  };

  const onStepIndex = useCallback(
    (bus: any, index: number) => {
      const { location } = bus;
      const { lat: lat, lng: lng } = location;
      setCoordinates(lat, lng);
      setCurrentIndex(index);
    },
    [setCoordinates]
  );

  return (
    <div className="flex px-10 overflow-y-scroll overflow-x-hidden relative h-[70vh]">
      <div className="flex absolute top-0">
        <ReactSlider
          className="vertical-slider"
          markClassName="example-mark"
          trackClassName="example-track"
          defaultValue={0}
          onChange={_handleSliderIndex}
          value={currentIndex}
          min={0}
          max={listings.length - 1}
          marks
          renderMark={(props) => {
            let { key, className, style } = props;
            if (Number(props.key) < currentIndex) {
              props.className = "example-mark example-mark-completed";
            } else if (props.key === currentIndex) {
              props.className = "example-mark example-mark-active";
            }
            return <span {...props} key={key} />;
          }}
          orientation="vertical"
        />
        <div>
          <Steps
            listings={listings}
            currentIndex={currentIndex}
            onClick={onStepIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingBusStop;
