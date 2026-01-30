import axios from "axios";
import type { Note, NoteTag } from "../types/note";
import toast from "react-hot-toast";

const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
const URL = "https://notehub-public.goit.study/api/notes";
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
    url: `${URL}`,
    params: { search: query, page: page, perPage: perPage },
    headers: {
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  };
  const { data } = await axios.request<FetchNotesResponse>(options);

  if (data.notes.length === 0) {
    toast.error("No matches for your query");
  }

  return {
    notes: data.notes,
    totalPages: data.totalPages,
  };
}
export async function deleteNote(id: string) {
  const { data } = await axios.delete<Note>(`${URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });
  return data;
}

interface NoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function createNote(noteData: NoteData) {
  const { data } = await axios.post<Note>(`${URL}`, noteData, {
    headers: {
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });
  return data;
}
