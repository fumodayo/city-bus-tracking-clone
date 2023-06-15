import { NextResponse } from "next/server";

import getBusStops from "@/app/actions/getBusStop";

export async function GET() {
  const busStops = await getBusStops();
  return NextResponse.json(busStops);
}
