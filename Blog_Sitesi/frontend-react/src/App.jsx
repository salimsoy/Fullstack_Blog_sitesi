import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import User from './components/User/User';
import { Routes, Route, Navigate, useNavigate, } from "react-router-dom";
import Auth from './components/Auth/Auth';

function App() {
  

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:userId" element={<User />} />
        <Route path="/auth" element={localStorage.getItem("currentUser") !=null ? (
              <Navigate to="/" />
            ) : (
              <Auth /> 
            )} ></Route>
    
      </Routes>
    </div>
  );
}

export default App;
