import axios from "axios";
import type { Note } from "../types/note";

const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  query: string,
  page: number = 1,
  perPage: number = 12,
) {
  const options = {
    method: "GET",
    url: "https://notehub-public.goit.study/api/notes",
    params: { search: query, page: page, perPage: perPage },
    headers: {
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  };
  const { data } = await axios.request<FetchNotesResponse>(options);
  return {
    notes: data.notes,
    totalPages: data.totalPages,
  };
}
