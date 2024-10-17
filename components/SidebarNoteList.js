import SidebarNoteItem from "@/components/SidebarNoteItem";

export default async function NoteList({notes}) {
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
