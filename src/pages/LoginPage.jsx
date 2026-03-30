import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function LoginPage({API_URL, setUserInfo}) {
  const [wantToLogin, setWantToLogin] = useState(true);
  const toggleWantToLogin = () => {
    setWantToLogin(!wantToLogin);
  }

  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    try {
      const response = fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if(response.ok) {
        const data = response.json();
        setUserInfo(data);
        navigate('/');
      } else {
        throw new Error("Error in sign in.");
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  }

  return (
    <div className="w-screen flex justify-center items-center h-screen bg-[url('/bg-4.png')] bg-cover bg-center]">
      <div className="bg-white rounded-xl h-[70vh] w-[30vw] flex flex-col justify-center items-center *:p-4 [&>input]:w-80 [&>input]:bg-gray-200 [&>input]:rounded-xl gap-3">
        <h3 className="text-2xl">Sign In</h3>
        <input value={userName} onChange={(e) => (setUserName(e.target.value))} placeholder="UserName" />
        <input value={email} onChange={(e) => (setEmail(e.target.value))} placeholder="Email" />
        <input value={password} onChange={(e) => (setPassword(e.target.value))} placeholder="Password" />

        <button className="bg-linear-120 from-cyan-400 to-purple-500 
              hover:bg-linear-120 hover:from-purple-500 hover:to-cyan-400 transition duration-200 ease-in-out
              pl-9! pr-9! text-white font-bold rounded"
          onClick={loginUser}
        >{wantToLogin ? "Login" : "Sign Up"}</button>

        <div className="flex justify-center gap-2">
          <p>{wantToLogin ? "Not a user?" : "Already a user?"}</p>
          <button
            className="text-blue-800 underline"
            onClick={toggleWantToLogin}
          >{wantToLogin ? "Register" : "Login"}</button>
        </div>
      </div>
    </div>
  );
}