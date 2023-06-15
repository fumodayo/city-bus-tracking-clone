import getBusRoutes from "./actions/getBusRoute";
import getBusStops from "./actions/getBusStop";

import ClientOnly from "./components/ClientOnly";
import MapContainer from "./components/MapContainer";
import RoadDraw from "./components/RoadDraw";
import MapMarker from "./components/marker/MapMarker";
import Sidebar from "./components/sidebar/Sidebar";

const Home = async () => {
  const busstop = await getBusStops();
  const busroute = await getBusRoutes()

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
          <Sidebar busstop={busstop} busroute={busroute} />
          <MapMarker />
          <RoadDraw
            cooridinates={[
              [108.20636160954561, 16.06696053044494],
              [108.2285059251854, 16.078342175172956],
            ]}
          />
        </MapContainer>
      </div>
    </ClientOnly>
  );
};

export default Home;
