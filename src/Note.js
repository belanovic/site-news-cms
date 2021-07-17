import react from 'react';

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
                name = "note"
                value = {note}
                onChange = {handleChange}
            ></textarea>
        </div>
    )
}