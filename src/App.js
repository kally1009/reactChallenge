import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import MainPage from './pages/MainPage';
import DetailedPage from './pages/DetailedPage';

function App() {
  return (
    <BrowserRouter>
        <div id="page-body">
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="details/:id" element={DetailedPage}/>
          </Routes>
        </div>
      
    </BrowserRouter>
  );
}

export default App;
