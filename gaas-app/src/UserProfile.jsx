import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  // Add your Firebase config here
};

firebase.initializeApp(firebaseConfig);

function UserProfile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const isLoggedIn = firebase.auth().currentUser !== null;

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>You are logged in!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in or sign up</p>
          <div>
            <label>Email:</label>
            <input type="text" onChange={handleEmailChange} value={email} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" onChange={handlePasswordChange} value={password} />
          </div>
          <div>
            <button onClick={handleLogin}>Log in</button>
            <button onClick={handleSignUp}>Sign up</button>
          </div>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
}

export default UserProfile;

// This implementation uses the useState hook to store the email and password inputs, and also any error messages that might occur during authentication. It provides three functions for sign-up, login, and logout, which call the Firebase authentication API using the provided email and password inputs. The currentUser property of the Firebase auth object is used to determine if the user is currently logged in, and display the appropriate UI.