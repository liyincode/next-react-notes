import {getAllNotes} from "@/lib/redis";
import SidebarNoteListFilter from "@/components/SidebarNoteListFilter";

export default async function NoteList() {
    const notes = await getAllNotes()
    const noteList = Object.entries(notes)

    if (noteList.length === 0) {
        return (
            <div className="notes-empty">
                {'No notes create yet'}
            </div>
        )
    }

    return (<SidebarNoteListFilter notes={noteList}/>)
}
