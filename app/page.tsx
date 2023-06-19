import getBusRoutes from "./actions/getBusRoute";
import getBusStops from "./actions/getBusStop";

import ClientOnly from "./components/ClientOnly";
import MapContainer from "./components/MapContainer";
import MapDraw from "./components/MapDraw";
import MapMarker from "./components/MapMarker";
import RouteSidebar from "./components/routesidebar/RouteSidebar";
import Sidebar from "./components/sidebar/Sidebar";

const Home = async () => {
  const busstop = await getBusStops();
  const busroute = await getBusRoutes();

  return (
    <ClientOnly>
      <div
        className="
          grid 
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        <MapContainer>
          <RouteSidebar />
          <Sidebar busstop={busstop} busroute={busroute} />
          <MapMarker />
          <MapDraw />
        </MapContainer>
      </div>
    </ClientOnly>
  );
};

export default Home;
