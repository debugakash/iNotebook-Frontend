import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-info"> {note.tag} </span>
                <div className="card-body" style={{
                    color: props.changeColor === "dark" ? "white" : "black",
                    backgroundColor: props.changeColor === "dark" ? "#212529" : "white"
                }}>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-file-pen mx-2" onClick={() => { return updateNote(note) }}></i>
                        <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully!", "success"); }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem