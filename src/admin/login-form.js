import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";

const Login = () => {
  const history = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);

  const handleClick = async () => {
    try {
      await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      history.push("/admin");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h1>Admin Dashboard</h1>
        <input
          placeholder="username"
          className="input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className="button">
          Sign In
        </button>
        {error && <span className="error">Wrong Credentials!</span>}
      </div>
    </div>
  );
};

export default Login;
