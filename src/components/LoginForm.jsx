import { useState } from 'react';
import axios from 'axios';

const projectID = 'c7d9648d-16d5-4528-bc6b-a0506f4583cb';

const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

    try {

      // username | passsword  => chat-engine -> give messages

      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

       // If that works out -> logged in

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload();   // reloading the page -> coz after storing the first item , it has to store any 2nd item and so on.
      setError('');
    } catch (err) {

    // If that doesn't work out -> error -> incorrect credentials.

      setError('Oops, incorrect credentials.');
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>

  );
};

export default Modal;
