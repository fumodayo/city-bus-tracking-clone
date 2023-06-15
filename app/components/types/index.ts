export type SafeRoutes = {
  code: string | null;
  name: string | null;
  routeDirectionStart: string | null;
  routeDirectionReturn: string | null;
  color: string | undefined;
  address: string | null;
};

export type SafeStations = {
  code?: string;
  color?: string;
  name: string | null;
  location: {
    lat: number;
    lng: number;
  };
  direction: string | null;
  codeRoute: string | null;
  address: string | null;
};
