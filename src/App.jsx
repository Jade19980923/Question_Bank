import Header from './components/Header'
import AuthRouter from './components/AuthRouter'
import NavigationBar from './components/NavigationBar'
import BottomBar from './components/BottomBar'
import { useRoutes, Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Background from './components/Background'




function App() {
  return (
    <Router>
      <div className="app-box">
        <Header></Header>

        <NavigationBar></NavigationBar>
        <AuthRouter></AuthRouter>
        <Background></Background>
        <BottomBar></BottomBar>
        
      </div>
      
    </Router>

  );
}

export default App;
