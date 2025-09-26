import { useQuery } from "@tanstack/react-query";
import { privateHttp } from "../lib/http";

export type Lesson = {
  id: string;
  studentId: string;
  teacherId: string;
  room: string;
};

export async function listLessonsRequest(): Promise<Lesson[]> {
  const res = await privateHttp.get("/lessons");
  return res.data as Lesson[];
}

export function useLessonsQuery() {
  return useQuery({
    queryKey: ["lessons"],
    queryFn: () => listLessonsRequest(),
  });
}
