
import './App.css';
import Home from './components/home';
import Summary from './components/summary';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      

      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/summary" element={<Summary />}/>
        
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
