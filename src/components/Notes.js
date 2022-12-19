import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = (props) => {
    // Receive notes from NoteState (Context APIs)
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
            // eslint-disable-next-line
        }
        else {
            navigate("/login");
        }
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)

    // state for handling with input field values
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    // function to update an existing note
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated Successfully!", "success")
    }

    // function for getting input values(enable to type in the text field)
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote showAlert={props.showAlert} changeColor={props.changeColor} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{
                        color: props.changeColor === "dark" ? "white" : "black",
                        backgroundColor: props.changeColor === "dark" ? "#212529" : "white"
                    }}>
                        <div className="modal-header">
                            <h5 className="modal-title text-center text-info" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required style={{
                                        color: props.changeColor === "dark" ? "white" : "black",
                                        backgroundColor: props.changeColor === "dark" ? "#212529" : "white"
                                    }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required style={{
                                        color: props.changeColor === "dark" ? "white" : "black",
                                        backgroundColor: props.changeColor === "dark" ? "#212529" : "white"
                                    }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} style={{
                                        color: props.changeColor === "dark" ? "white" : "black",
                                        backgroundColor: props.changeColor === "dark" ? "#212529" : "white"
                                    }} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h1 className='text-center text-primary' style={{ color: props.changeColor === "dark" ? "white" : "black" }}>Your Notes</h1>
                <div className="container mx-2" style={{ color: props.changeColor === "dark" ? "white" : "black" }}>
                    {notes.length === 0 && 'No Notes to Display!'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} changeColor={props.changeColor} />
                })}
            </div>
        </>
    )
}

export default Notes
