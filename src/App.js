import { ChatEngine } from 'react-chat-engine';   // Chat Engine uses "socket" behind the scenes.

import {ChatFeed} from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';

const projectID = 'c7d9648d-16d5-4528-bc6b-a0506f4583cb';

const App = () => {
  if (!localStorage.getItem('username')) return <LoginForm />;

  /* Right-click -> Inspect -> ">>" sign -> Applications -> Local Storage -> https://localhost:3000 */

  /* And this is the place where the "admin" users account are saved. 
  You can clear from their by right clicking on it.
  Or else if you can add new admin users account which will saved further 
  in the local storage. */

  /* If you clear the local storage , then after refreshing the website , you will
  be redirected to the login page. */

  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      /* Now we can render our own components into the chatfeed */
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}   
      /* renderChatFeed ->
      Sending all the props of chatEngine component to the custom chatFeed 
      component by copying them using the "..." spread operator  */
    />
  );
};


export default App;
