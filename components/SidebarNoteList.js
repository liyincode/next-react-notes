import {getAllNotes} from "@/lib/redis";
import SidebarNoteListFilter from "@/components/SidebarNoteListFilter";
import SidebarNoteItemHeader from "@/components/SidebarNoteItemHeader";

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


    return (
        <SidebarNoteListFilter
            notes={
                noteList.map(([noteId, note]) => {
                    const noteData = JSON.parse(note)
                    return {
                        noteId,
                        note: noteData,
                        header: <SidebarNoteItemHeader title={noteData.title} updateTime={noteData.updateTime}/>
                    }
                })
            }
        />
    )
}
