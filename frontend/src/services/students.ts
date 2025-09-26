import { useQuery } from "@tanstack/react-query";
import { privateHttp } from "../lib/http";
import type { Student } from "../types/student";

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
