import SidebarNoteItem from "@/components/SidebarNoteItem";
import {getAllNotes} from "@/lib/redis";

export default async function NoteList() {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    await sleep(10000);

    const notes = await getAllNotes()
    const noteList = Object.entries(notes)

    if (noteList.length === 0) {
        return (
            <div className="notes-empty">
                { 'No notes create yet'}
            </div>
        )
    }

    return (
        <ul className="notes-list">
            {noteList.map(([noteId, note]) => {
                return (
                    <li key={noteId}>
                        <SidebarNoteItem noteId={noteId} note={JSON.parse(note)}/>
                    </li>
                )
            })}
        </ul>
    )
}
