import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import DetailsPage from './pages/DetailsPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="details/:id" element={DetailsPage}/>
          </Routes>
        </div>
      
    </BrowserRouter>
  );
}

export default App;
