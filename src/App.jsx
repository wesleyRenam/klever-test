import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddToken from './pages/AddToken';
import EditToken from './pages/EditToken';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Home/> } />
          <Route path="addtoken" element={ <AddToken/>} />
          <Route path="edittoken/:id" element={ <EditToken /> } />
        </Routes> 
      </BrowserRouter> 
  );
}

export default App;
