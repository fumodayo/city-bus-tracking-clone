import getBusRoutes from "./actions/getBusRoute";
import getBusStops from "./actions/getBusStop";

import ClientOnly from "./components/ClientOnly";
import MapContainer from "./components/MapContainer";
import MapDraw from "./components/MapDraw";
import MapMarker from "./components/MapMarker";
import PlaceMarker from "./components/PlaceMarker";

import Chips from "./components/chips/Chips";
import RouteSidebar from "./components/routesidebar/RouteSidebar";
import Sidebar from "./components/sidebar/Sidebar";
import ToastProvider from "./providers/ToastProvider";

const Home = async () => {
  const busstop = await getBusStops();
  const busroute = await getBusRoutes();

  return (
    <ClientOnly>
      <ToastProvider />
      <MapContainer>
        <RouteSidebar />
        <MapMarker />
        <MapDraw />
        <PlaceMarker />
        <div className="flex flex-row">
          <Sidebar busstop={busstop} busroute={busroute} />
          <Chips />
        </div>
      </MapContainer>
    </ClientOnly>
  );
};

export default Home;
