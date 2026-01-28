import axios from "axios";
const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
export async function fetchNotes(query: string, page: number = 1) {
  const options = {
    method: "GET",
    url: "https://notehub-public.goit.study/api/notes",
    params: { query: query, page: page },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  };
  const { data } = await axios.request(options);
  return {
    notes: data.notes,
    totalPages: data.totalPages,
  };
}
