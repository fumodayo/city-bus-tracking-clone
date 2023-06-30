"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IoClose, IoSearch } from "react-icons/io5";

interface PinInputProps {
  image: string;
  onClick: () => void;
  lat: number | null;
  lng: number | null;
  placeholder: string;
}

const PinInput: React.FC<PinInputProps> = ({
  image,
  onClick,
  lat,
  lng,
  placeholder,
}) => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchPoint = async () => {
      if (lng && lat) {
        try {
          const { data } = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=poi&access_token=pk.eyJ1IjoidGhhaXJ5byIsImEiOiJjbDdjb2ZnY3QxM2F6M3FtaW9zMDFpNWkzIn0.tPFJvhG-HJ0TdmJGolVjHA&language=vi`
          );
          const placeName = data.features[0].place_name;
          setAddress(placeName);
        } catch (error) {
          toast.error("Không lấy được địa chỉ!");
        }
      }
    };
    fetchPoint();
  }, [lng, lat]);

  return (
    <div className="w-full bg-[white] rounded text-left px-4 py-0 flex flex-row">
      <Image src={image} width={30} height={30} alt="markderred" />
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full mx-2 focus:outline-none"
        placeholder={placeholder}
      />
      <div className="p-1">
        {address.length > 0 ? (
          <IoClose
            onClick={() => {
              setAddress("");
              onClick();
            }}
            size={20}
            className="cursor-pointer text-mainColor"
          />
        ) : (
          <IoSearch size={20} />
        )}
      </div>
    </div>
  );
};

export default PinInput;
