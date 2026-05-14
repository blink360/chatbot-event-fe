import axiosClient from "src/lib/axios";

export interface Event {
  id: string;
  name: string;
  description: string;
  timezone: string;
  startDate: string;
  endDate: string;
  status: string;
}

export const getEvents = async (): Promise<Event[]> => {
  const res: any = await axiosClient.get("/event");
  return res.data as Event[];
};
