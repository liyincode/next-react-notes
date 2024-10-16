
import dayjs from 'dayjs'

export default async function NoteList({notes}) {
    const noteList = Object.entries(notes)
    console.log('nodeList', noteList)

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
                const {title, updateTime} = JSON.parse(note)
                return (
                    <li key={noteId}>
                        <header className="sidebar-note-header">
                            <strong>{title}</strong>
                            <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
                        </header>
                    </li>
                )
            })}
        </ul>
    )
}
