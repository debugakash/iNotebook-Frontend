import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    // function from NoteState to create a new Note
    const context = useContext(noteContext);
    const { addNote } = context;

    // state for handling with input field values
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added Successfully!", "success")
    }

    // function for getting input values
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h1 className="text-center text-info">Add a Note</h1>
            <form className='my-3' style={{ color: props.changeColor === "dark" ? "white" : "black" }}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required style={{
                        color: props.changeColor === "dark" ? "white" : "black",
                        backgroundColor: props.changeColor === "dark" ? "#212529" : "white"
                    }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required style={{
                        color: props.changeColor === "dark" ? "white" : "black",
                        backgroundColor: props.changeColor === "dark" ? "#212529" : "white"
                    }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required style={{
                        color: props.changeColor === "dark" ? "white" : "black",
                        backgroundColor: props.changeColor === "dark" ? "#212529" : "white"
                    }} />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-info" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
