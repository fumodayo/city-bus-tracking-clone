import prisma from "@/app/libs/prismadb";

export default async function getBusRoutes() {
  try {
    const busroute = await prisma.busRoute.findMany();
    return busroute;
  } catch (error: any) {
    throw new Error(error);
  }
}
