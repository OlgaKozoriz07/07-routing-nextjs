'use client';
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { useDebounce } from "use-debounce";
import css from './page.module.css';
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

type NotesClientProps = {
    initialPage: number;
    initialSearch: string;
};



export default function NotesClient({ initialPage, initialSearch }: NotesClientProps) {
    const [page, setPage] = useState(initialPage);
    const [search, setSearch] = useState(initialSearch);
    const [debouncedSearch] = useDebounce(search, 500);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };


const { data, isLoading, isError } = useQuery({
  queryKey: ["notes", { page, search: debouncedSearch }],
  queryFn: () => fetchNotes(page, debouncedSearch),
  placeholderData: keepPreviousData,
});

    if (isLoading) {
        return <p>Loading, please wait...</p>;
    }

    if (isError || !data) {
        return <p>Something went wrong.</p>;
    }

    return (
        <main className={css.app}>
            <div className={css.toolbar}>
                <h1>Notes</h1>
                <button className={css.button} onClick={openModal}>Create note</button>
            </div>
            <div className={css.controls}>
                <SearchBox value={search} onChange={handleSearchChange} />
                {data.totalPages > 1 && (
                    <Pagination
                        totalPages={data.totalPages}
                        currentPage={page}
                        onPageChange={setPage}
                    />
                )}
            </div>
            <NoteList notes={data.notes} />
            <Modal isOpen={isModalOpen} onClose={closeModal} titleId="create-note-title">
                <h2 id="create-note-title">Create note</h2>
                <NoteForm
                    onCancel={closeModal}
                    onSuccess={() => {
                        setPage(1);
                    }}
                />
            </Modal>
        </main>
    );
}