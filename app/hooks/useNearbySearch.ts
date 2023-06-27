import axios from "axios";
import { useEffect, useState } from "react";

const MAP4D_API_KEY = "b965a1ce463b7316850ae5c9bb7f4fff";

const useNearbySearch = (
  category: string | null,
  latitude: number | null,
  longitude: number | null
) => {
  const [location, setLocation] = useState([]);
  useEffect(() => {
    const formattedLocation = async () => {
      const { data } = await axios.get(
        `http://api.map4d.vn/sdk/place/nearby-search?key=${MAP4D_API_KEY}&location=${latitude},${longitude}&radius=${"50"}&types=${category}`
      );
      let formatted = [];
      formatted = data.result.map((location: any) => ({
        name: location.name,
        address: location.address,
        lat: location.location.lat,
        lng: location.location.lng,
      }));
      setLocation(formatted);
    };
    formattedLocation();
  }, [category, latitude, longitude]);
  return location;
};

export default useNearbySearch;
