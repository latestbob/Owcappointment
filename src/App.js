
import './App.css';
import Home from './components/home';
import Summary from './components/summary';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Complete from './components/complete';

function App() {
  return (
    <div className="App">
      

      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/summary" element={<Summary />}/>
      <Route path="/complete" element={<Complete />}/>
        
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
