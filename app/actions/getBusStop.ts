import prisma from "@/app/libs/prismadb";

export default async function getBusStops() {
  try {
    const busstop = await prisma.busStop.findMany();
    return busstop;
  } catch (error: any) {
    throw new Error(error);
  }
}
