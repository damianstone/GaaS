import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user");
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>
        An error occurred: {error.message}
          </p>;
  }

  if (!user) {
    return (
      <div>
        <p>
            Please log in to view your profile.
        </p>
        <a href="/login">
            Log In
        </a>
      </div>
    );
  }

  return (
    <div>
      <h1>
        Welcome, {user.displayName}!
      </h1>
      <p>
        Email: {user.email}
      </p>
      <p>
        ID: {user.uid}
      </p>
      <button onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default UserProfile;

// This implementation uses the useState hook to store the email and password inputs, and also any error messages that might occur during authentication. It provides three functions for sign-up, login, and logout, which call the Firebase authentication API using the provided email and password inputs. The currentUser property of the Firebase auth object is used to determine if the user is currently logged in, and display the appropriate UI.
// This version uses the axios library to make HTTP requests to the server instead of Firebase's SDK. The fetchUserData function makes a GET request to the /api/user endpoint to retrieve the user data, and the handleLogout function makes a POST request to the /api/logout endpoint to log the user out.