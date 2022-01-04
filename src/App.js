import './App.css';
import { useNavigate, useParams} from "react-router-dom";
import { Link, Route, Routes} from "react-router-dom";
import { Switch } from "react-router";
import { useState,useEffect } from 'react';

const URL = "http://localhost:9000/"

function App() {

  return (
    <div className="container">
      <ul>
      <li>
      <Link to = "/login">login</Link>
      </li>
      <li>
       <Link to = "/sign-up">signUp</Link>
      </li>
      <li>
       <Link to = "/forget-password">forget password</Link>
      </li>
      </ul>

      <Routes>
      <Route path="/login" element={<Login />}>
        </Route>
        <Route path="/sign-up" element={<SignUp />}>
        </Route>
        <Route path="/forget-password" element={<Forgotpassword />}>
        </Route>
        <Route path="/reset-password/:email/:token" element={<Resetpassword />}>
        </Route>
      </Routes>
    </div>
  );
}

function Login() {
  const [password,setPassword] = useState("")
  const [email, setEmail] = useState("");


  const login = () => {
    const data = {email,password}
    console.log(data,URL)
    fetch(URL+"sign-in",{
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
      })
     .then(data => data.json())
     .then(result => {
      if(result.message) {
        alert(result.message);
      }
     })
    }
  return (
    <div className="container">
      <input value = {email} type = "email" name = "email" onChange={(e) => {setEmail(e.target.value)}}/>
      <input value = {password} type = "password" name = "password" onChange={(e) => {setPassword(e.target.value)}}/>
      <input type = "submit" onClick = {() => {login()}}/>
    </div>
  )
}

function SignUp() {
  const [password,setPassword] = useState("");
  const [email, setEmail] = useState("");
  const data = {email,password};
  const createNewUser = () => {
    fetch(URL+"sign-up",{
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
      })
     .then(data => data.json())
     .then(result => {
      if(result.message) {
        alert(result.message);
      }
    })
  }

  return(
    <div>
      <input value = {email} type = "email" name = "email" 
      onChange={(e) => {setEmail(e.target.value)}}/>
      <input value = {password} type = "password" name = "password" 
      onChange={(e) => {setPassword(e.target.value)}}/>
      <input type="submit" onClick = {() => {createNewUser()}}/>
    </div>
  )
}

function Forgotpassword() {
  
  const [email,setEmail] = useState("")
  const forgotpassword = () => {
    const data = {email}
    fetch(URL+"forgot-password",{
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
      })
     .then(data => data.json())
     .then(result => {
      if(result.message) {
        alert(result.message);
      }
    })
  }
  return(
    <div>
      <input value = {email} type = "email" name = "email" onChange={(e) => {setEmail(e.target.value)}}/>
      <input type="submit" onClick = {() => {forgotpassword()}}/>
    </div>
  )
}

function Resetpassword() {
  const {email} = useParams()
  const navigate = useNavigate();

  const [password,setPassword] = useState("");
  const data = {email,password};
  const resetpassword = () => {
    console.log(password)
    fetch(URL+"reset-password",{
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
      })
     .then(data => data.json())
     .then(result => {
      if(result.message) {
        alert(result.message);
        navigate("/login")
      }
    })
  }
  
  return(
    <div>
      <input value = {email} type = "email" name = "email" />
      <input value = {password} type = "password" name = "password" onChange={(e) => {setPassword(e.target.value)}}/>
      <input type="submit" onClick = {() => {resetpassword()}}/>
    </div>
  )
}
export default App;
