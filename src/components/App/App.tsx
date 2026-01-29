import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/Searchbox";
import css from "./App.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages ?? 1;

  const handleOpenModal = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={setQuery} />
          <Pagination
            totalPages={totalPages}
            page={page}
            onPageChange={setPage}
          />
          <button className={css.button} onClick={handleOpenModal}>
            Create note +
          </button>
        </header>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading notes</p>}
        {notes.length > 0 && isSuccess && <NoteList notes={notes} />}
      </div>
      {isVisible && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
}

export default App;
