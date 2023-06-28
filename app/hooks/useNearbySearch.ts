import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const MAP4D_API_KEY = "";

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
      if (data?.ok) {
        let formatted = [];
        formatted = data.result.map((location: any) => ({
          name: location.name,
          address: location.address,
          lat: location.location.lat,
          lng: location.location.lng,
        }));
        setLocation(formatted);
      }
      if (data?.message && category) {
        toast.error(
          "Chức năng tìm kiếm địa điểm lân cận đang bị lỗi, vì mình hết tiền rồi"
        );
      }
      setLocation([]);
    };
    formattedLocation();
  }, [category, latitude, longitude]);
  return location;
};

export default useNearbySearch;
