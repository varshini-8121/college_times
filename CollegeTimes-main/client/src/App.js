
import Home from './pages/home/home';
import Topbar from './components/topbar/Topbar';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Settings from './pages/settings/Settings';
import Login from './pages/login/login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import Register from './pages/register/Register';
import { useContext } from 'react';
import { Context } from './context/Context';
function App() {
  const {user}=useContext(Context);
  return (
    <Router>

      <Topbar />
    
      <Routes>
        <Route exact path="/" element={ <Home />}>                                  </Route>
        <Route path="/register" element= {user ? <Home /> : <Register />}>    </Route>
        <Route path="/login" element={user ? <Home /> : <Login />}>           </Route>
        <Route path="/post/:id" element={<Single />}>                                </Route>
        <Route path="/write" element={user ? <Write /> : <Login />}>          </Route>
        <Route path="/settings" element={user ? <Settings /> : <Login />}>    </Route>
      </Routes>
    </Router>
   
    
    
  );
}

export default App;
