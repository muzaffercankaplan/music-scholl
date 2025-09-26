import { useQuery } from "@tanstack/react-query";
import { privateHttp } from "../lib/http";

export type Student = { id: string; name: string };

export async function listStudentsRequest(): Promise<Student[]> {
  const res = await privateHttp.get("/students");
  return res.data as Student[];
}

export function useStudentsQuery() {
  return useQuery({
    queryKey: ["students"],
    queryFn: () => listStudentsRequest(),
  });
}
