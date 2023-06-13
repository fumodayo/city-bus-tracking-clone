export type SafeRoutes = {
  code: string;
  name: string;
  routeDirectionStart: string;
  routeDirectionReturn: string;
  color: string;
  address: string;
};

export type SafeStations = {
  code?: string;
  color?: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  direction: string;
  codeRoute: string;
  address: string;
};
