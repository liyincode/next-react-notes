'use client'

import {useSearchParams} from "next/navigation";
import SidebarNoteItemContent from "@/components/SidebarNoteItemContent";

export default function SidebarNoteListFilter({notes}) {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    if (query) {
        notes = notes.filter(({note}) => {
            return note.title.includes(query);
        });
    }

    return (
        <ul className="notes-list">
            {
                notes.map(({noteId, note, header}) => {
                        return (
                            <li key={noteId}>
                                <SidebarNoteItemContent
                                    id={noteId}
                                    title={note.title}
                                    expandedChildren={
                                        <p className="sidebar-note-excerpt">
                                            {note.content?.substring(0, 20) || <i>(No content)</i>}
                                        </p>
                                    }
                                >
                                    {header}
                                </SidebarNoteItemContent>
                            </li>
                        )
                    }
                )
            }
        </ul>

    )
}
