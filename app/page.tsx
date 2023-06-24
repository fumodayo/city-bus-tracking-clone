import getBusRoutes from "./actions/getBusRoute";
import getBusStops from "./actions/getBusStop";

import ClientOnly from "./components/ClientOnly";
import MapContainer from "./components/MapContainer";
import MapDraw from "./components/MapDraw";
import MapMarker from "./components/MapMarker";
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
        <Sidebar busstop={busstop} busroute={busroute} />
        <MapMarker />
        <MapDraw />
      </MapContainer>
    </ClientOnly>
  );
};

export default Home;
