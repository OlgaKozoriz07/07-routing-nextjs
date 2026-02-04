import axios from "axios";
import type { Note, NoteTag } from "../types/note";


interface NotesHTTPResponse{
    notes: Note[];
    totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;


export const fetchNotes = async(
    page: number = 1,
    search?: string,
    tag?: string,
): Promise<NotesHTTPResponse> => {
    const response = await axios.get<NotesHTTPResponse>('/notes',
        {
            params: {
                search: search,
                page: page,
                perPage: 10,
                tag: tag,
            },
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }
        
    );
    return response.data;
}



export const fetchNoteById = async (noteId: string) => {
  const response = await axios.get<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};


type CreateNoteBody = {
  title: string;
  content: string;
  tag: NoteTag;
};

export const createNote = async (note: CreateNoteBody): Promise<Note> => {
    const response = await axios.post<Note>('/notes', note, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });
    return response.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await axios.delete<Note>(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });
   return response.data;
}