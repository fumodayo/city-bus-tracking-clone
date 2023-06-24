import { useMemo, useState } from "react";
import useBusStopStore from "./useBusstop";
import { SafeRoad, SafeStations } from "../components/types";
import useCheckboxStore from "./useCheckbox";
import roadmap from "../data/roadmap.json";

const useFilterBusstop = () => {
  const busstore = useBusStopStore();
  const [busstop, setBusstop] = useState<SafeStations[]>([]);

  useMemo(() => {
    const filteredBus = busstore.busstopStore.filter(
      (route) =>
        route.codeRoute === busstore.code &&
        route.direction === busstore.direction
    );
    setBusstop(filteredBus);
  }, [busstore]);

  return busstop;
};

const useFileredMarker = () => {
  const checked = useCheckboxStore();
  const busstore = useBusStopStore();

  const [marker, setMarker] = useState<SafeStations[]>([]);

  useMemo(() => {
    const filteredMarker = busstore.busstopStore.filter(
      (bus) =>
        checked.routeCodes.includes(bus.codeRoute as string) &&
        bus.direction === busstore.direction
    );
    setMarker(filteredMarker);
  }, [busstore, checked]);

  return marker;
};

const useFilteredPath = () => {
  const checked = useCheckboxStore();
  const busstore = useBusStopStore();
  const road = roadmap;

  const [path, setPath] = useState<SafeRoad[]>([]);

  useMemo(() => {
    const filteredPath = road.filter(
      (bus) =>
        checked.routeCodes.includes(bus.codeRoute as string) &&
        bus.direction === busstore.direction
    );
    setPath(filteredPath);
  }, [busstore, checked, road]);

  return path;
};

export { useFilterBusstop, useFileredMarker, useFilteredPath };
