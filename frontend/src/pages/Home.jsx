import {useState,useEffect} from 'react';
import api from '../api';




function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    getNotes();
  });

  // Get all notes
  const getNotes = () => {
    api
      .get('/api/notes')
      .then((response) => response.data)
      .then((data) => {setNotes(data)})
      .catch((error) => alert(error));
  }

  // Delete a note
  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}`)
      .then((response) => {
        if (response.status === 204) alert('Note deleted');
        else alert('Failed to delete note');
      })
      .catch((error) => alert(error));
    getNotes();
    }

  // Create a note
  const createNote = (e) => {
    e.preventDefault();
    api
      .post('/api/notes', {title, content})
      .then((response) => {
        if (response.status === 201) alert('Note created');
        else alert('Failed to create note');
      })
      .catch((error) => alert(error));
    getNotes();
  }

  return (
    <div>
      <div>
        <h2>Notes</h2>

      </div>
      <h2>Create a Note</h2>

      <form onSubmit={createNote}>

        <label htmlFor="title">
          Title:
        </label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          required onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content">
          Content:
        </label>
        <br />
        <textarea
          id="content"
          name="content"
          required value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />

        <input type="submit" value="Submit"/>
      </form>
    </div>
  )

}


export default Home;
