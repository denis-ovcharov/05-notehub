import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";
import toast from "react-hot-toast";

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
}

export default function NoteList({ notes, onEdit }: NoteListProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError() {
      toast.error("There was an error");
    },
  });
  return (
    <>
      <ul className={css.list}>
        {notes.map((note) => (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button className={css.edit} onClick={() => onEdit(note)}>
                Edit
              </button>
              <button
                className={css.button}
                onClick={() =>
                  mutate(note.id, {
                    onSuccess: () => toast.success("Note deleted"),
                  })
                }
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
