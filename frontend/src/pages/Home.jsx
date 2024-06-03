import {useState,useEffect} from 'react';
import api from '../api';




function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    getNotes();
  });

  const getNotes = () => {
    api
      .get('/api/notes')
      .then((response) => response.data)
      .then((data) => {setNotes(data)})
      .catch((error) => alert(error));
  }



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
  }
  const createNotes = (e) => {
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

  const updateNote = async (id) => {
    api
      .put(`/api/notes/${id}`, {title, content})
      .then(() => getNotes())
      .catch((error) => alert(error));
  }
  return (
    <div>
      <h1>Home</h1>
    </div>
    )

}

export default Home;
