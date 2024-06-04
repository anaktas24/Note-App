import React from "react";

function Note({note, onDelete}){
  const formattedDate = new Date(note.created_at).toLocaleDateString('en-EU')

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-date">{}</p>
      <button className="delete-button"onClick={() => onDelete(note._id)}>Delete</button>
    </div>
  )
}

export default Note;
