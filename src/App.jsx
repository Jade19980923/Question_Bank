import Header from './components/Header'
import AuthRouter from './components/AuthRouter'
import BottomBar from './components/BottomBar'
import { useRoutes, Navigate, BrowserRouter as Router } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-box">
        <Header></Header>
        <AuthRouter></AuthRouter>
        <BottomBar></BottomBar>
      </div>
    </Router>

  );
}

export default App;
