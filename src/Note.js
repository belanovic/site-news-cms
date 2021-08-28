import react from 'react';
import './style/note.css'

export default function Note({note, setNote}) {

    const handleChange = (e) => {
        const v = e.target.value;
        setNote(v);
    }

    return (
        <div className = "note">
            <label htmlFor = "note">Napomena</label>
            <textarea 
                id = "note"
                className = "note-text"
                name = "note"
                value = {note}
                onChange = {handleChange}
            ></textarea>
        </div>
    )
}