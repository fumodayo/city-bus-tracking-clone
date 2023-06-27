import getBusRoutes from "./actions/getBusRoute";
import getBusStops from "./actions/getBusStop";

import ClientOnly from "./components/ClientOnly";
import MapContainer from "./components/MapContainer";
import MapDraw from "./components/MapDraw";
import MapMarker from "./components/MapMarker";
import BusstopSidebar from "./components/busstopsidebar/BusstopSidebar";
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
        <div className="flex flex-row fixed">
          <Sidebar busstop={busstop} busroute={busroute} />
          <Chips />
        </div>
        <MapMarker />
        <MapDraw />
      </MapContainer>
    </ClientOnly>
  );
};

export default Home;
