export function toRadians(degrees: any) {
  return degrees * (Math.PI / 180);
}

export const calculateDistance = (
  lat1: any,
  lng1: any,
  lat2: any,
  lng2: any
) => {
  const R = 6371; // Bán kính Trái Đất trong km
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 1000; // Covert distance to meters
  return distance;
};
