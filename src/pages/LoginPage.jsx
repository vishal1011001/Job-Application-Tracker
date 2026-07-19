import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function LoginPage({ API_URL, setUserInfo }) {
  const [wantToLogin, setWantToLogin] = useState(true);
  const [wrongCreds, setWrongCreds] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Something went wrong. Try again later.');
  const toggleWantToLogin = () => {
    setWrongCreds(false);
    setWantToLogin(!wantToLogin);
  }

  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if(password.length < 8) {
      setWrongCreds(true);
      setErrorMessage('Password must have alteast 8 characters')
      throw new Error('password too short.');
    }

    const credentials = {
      username: userName,
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName
    }
    try {
      const response = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if(!response.ok) {
        setWrongCreds(true);
        setErrorMessage(data.message || "Registration failed.");
        throw new Error('Error Registering - user already exists');
      }
     
      // setUserInfo(data);
      
      await handleLogin();
    } catch (error) {
      console.error("Error signing up", error);
    }
  };


  const handleLogin = async (e) => {
    e?.preventDefault();

    const credentials = {
      email: email,
      password: password
    }
    try {
      const response = await fetch(`${API_URL}/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });
    
      const data = await response.json();
      
      if (!response.ok) {
        setWrongCreds(true);
        setErrorMessage(data.message || "Invalid email or password");
        throw new Error("Backend rejected login request.");
      }

      // setUserInfo(data);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      navigate('/');

    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-linear-60 bg-[url('/bg-y.jpg')] bg-cover bg-center">
      <div className="h-[70vh] w-[60vw] **:transition-all **:ease-in-out">
        <div className="bg-white h-full rounded-2xl flex flex-row">

          <div className="w-[50%] h-full flex flex-col items-center justify-center gap-3 **:outline-0">
            <h3 className="font-serif text-2xl">{wantToLogin ? "Sign In" : "Create New Account"}</h3>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="p-3 w-[70%] rounded-4xl bg-gray-200" placeholder="Enter your email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="p-3 w-[70%] rounded-4xl bg-gray-200" placeholder="Enter a strong password" />
            {!wantToLogin && (
              <div className="flex flex-col bg-linear-30 from-slate-500 to-slate-700 rounded-2xl justify-center w-[80%] p-2 gap-2 place-self-center items-end shadow-md shadow-blue-600"> 
                <p className="place-self-start text-white">Enter Your Details:</p>
                <input value={userName} onChange={(e) => setUserName(e.target.value)} className="p-3 w-[90%] rounded-xl bg-gray-100" placeholder="Create a UserName" />
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="p-3 w-[90%] rounded-xl bg-gray-100" placeholder="Your First Name" />
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="p-3 w-[90%] rounded-xl bg-gray-100" placeholder="Your Last Name" />
              </div>
            )}

            {wrongCreds && <p className="text-red-600">{errorMessage}</p>}

            <button
              className="bg-slate-600 text-white p-2 pl-6 pr-6 rounded border border-white
                        hover:text-gray-800 hover:border-gray-800 hover:bg-white
                        "
              onClick={wantToLogin ? handleLogin : handleRegister}
            >{wantToLogin ? "Sign In" : "Sign Up"}</button>
          </div>

          {/*Side Div for register instruction*/}
          <div className="h-full w-[50%] place-self-end bg-gray-700 *:text-white rounded-l-[10vh] rounded-r-xl flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-bold place-self-start">Hello There!</h2>
              {(!wantToLogin) &&
                <p className="font-serif text-xl">
                  If you are an existing user <br />
                  Sign In to your account
                </p>
              }
              {(wantToLogin) &&
                <p className="font-serif text-xl">
                  If you are a new user, <br />
                  Create new Account by signing up:
                </p>
              }

              <button className="mt-8 bg-white text-black p-2 pl-6 pr-6 rounded border border-gray-700
                                hover:bg-gray-700 hover:text-white hover:border-white
                                "
                onClick={toggleWantToLogin}
              >
                {wantToLogin ? "Register" : "Log In"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="w-screen h-screen flex justify-center items-center bg-[url('/bg-4.png')] bg-cover bg-center]">
  //     <div className="bg-white rounded-xl h-[70vh] w-[70vw] flex flex-row justify-center items-center *:p-4 [&>input]:w-80 [&>input]:bg-gray-200 [&>input]:rounded-xl gap-3">
  //       <div className="">
  //         <h3 className="text-2xl">Sign In</h3>
  //         {!wantToLogin && <>
  //           <input value={userName} onChange={(e) => (setUserName(e.target.value))} placeholder="UserName" />
  //           <input value={firstName} onChange={(e) => (setFirstName(e.target.value))} placeholder="First Name" />
  //           <input value={lastName} onChange={(e) => (setLastName(e.target.value))} placeholder="Last Name" />
  //         </>
  //         }
  //         <input value={email} onChange={(e) => (setEmail(e.target.value))} placeholder="Email" />
  //         <input value={password} onChange={(e) => (setPassword(e.target.value))} placeholder="Password" />

  //         <button className="bg-linear-120 from-cyan-400 to-purple-500 
  //             hover:bg-linear-120 hover:from-purple-500 hover:to-cyan-400 transition duration-200 ease-in-out
  //             pl-9! pr-9! text-white font-bold rounded"
  //           onClick={wantToLogin ? handleLogin : handleRegister}
  //         >{wantToLogin ? "Login" : "Sign Up"}</button>

  //         <div className="flex justify-center gap-2">
  //           <p>{wantToLogin ? "Not a user?" : "Already a user?"}</p>
  //           <button
  //             className="text-blue-800 underline"
  //             onClick={toggleWantToLogin}
  //           >{wantToLogin ? "Register" : "Login"}</button>
  //         </div>
  //       </div>
  //       <div className="bg-blue">

  //       </div>
  //     </div>
  //   </div>
  // );
}