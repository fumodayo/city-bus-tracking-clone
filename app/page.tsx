import ClientOnly from "@/components/ClientOnly";
import MapContainer from "@/components/MapContainer";
import Sidebar from "@/components/sidebar/Sidebar";

const Home = () => {
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
          <Sidebar />
        </MapContainer>
      </div>
    </ClientOnly>
  );
};

export default Home;
