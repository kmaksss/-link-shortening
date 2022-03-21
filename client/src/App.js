import React from 'react';
import 'materialize-css';
import { BrowserRouter as Router } from 'react-router-dom';
import { UseRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';

function App() {
  const { login, logout, token, userId, ready } = useAuth();
  const isAuth = !!token;
  const routes = UseRoutes(isAuth);

  if (!ready) {
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{
      login, logout, token, userId, isAuth
    }}>
      <Router>
        { isAuth && <Navbar/> }
        <div className="container">
          { routes }
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
