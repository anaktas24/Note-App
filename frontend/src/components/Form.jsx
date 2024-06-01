import {useState} from 'react';
import api from '../api';
import {useNavigate} from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';

function Form({route, method}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name =method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return <form onSubmit={handleSubmit} className="form-container">
    <h1>{name}</h1>
    <input
      className="form-input"
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  </form>
}
