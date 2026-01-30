import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SearchBox from "../SearchBox/SearchBox";
import EditPostForm from "../EditPostForm/EditPostForm";
import type { Note } from "../../types/note";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  type ModalType = "create" | "edit" | null;
  const [isVisible, setIsVisible] = useState<ModalType>(null);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page),
    placeholderData: keepPreviousData,
  });

  const updateQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setPage(1);
    },
    1000,
  );

  const notes = data?.notes || [];
  const totalPages = data?.totalPages ?? 1;

  const handleOpenCreateModal = () => {
    setIsVisible("create");
  };
  const handleOpenEditModal = (note: Note) => {
    setSelectedNote(note);
    setIsVisible("edit");
  };

  const handleCloseModal = () => {
    setIsVisible(null);
  };
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={updateQuery} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              page={page}
              onPageChange={setPage}
            />
          )}
          <button className={css.button} onClick={handleOpenCreateModal}>
            Create note +
          </button>
        </header>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {notes.length > 0 && isSuccess && (
          <NoteList notes={notes} onEdit={handleOpenEditModal} />
        )}
      </div>
      {isVisible === "create" && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
      {isVisible === "edit" && selectedNote && (
        <Modal onClose={handleCloseModal}>
          <EditPostForm note={selectedNote} onClose={handleCloseModal} />
        </Modal>
      )}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
