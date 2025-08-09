// import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navigation from './Navigation/Navigation';
function App() {
  return (
    <div className="App">
      
      <BrowserRouter><Navigation /></BrowserRouter>

      
    </div>
    
  );
}

export default App;
