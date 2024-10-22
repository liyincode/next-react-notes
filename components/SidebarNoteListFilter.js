'use client'

import SidebarNoteItem from "@/components/SidebarNoteItem";
import {useSearchParams} from "next/navigation";

export default function SidebarNoteListFilter({notes}) {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    if (query) {
        notes = notes.filter(([noteId, note]) => {
            const parsedNote = JSON.parse(note);
            return parsedNote.title.includes(query);
        });
    }

    return (
        <ul className="notes-list">
            {
                notes.map(([noteId, note]) => {
                        return (
                            <li key={noteId}>
                                <SidebarNoteItem noteId={noteId} note={JSON.parse(note)}/>
                            </li>
                        )
                    }
                )
            }
        </ul>

    )
}
