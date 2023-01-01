import Header from "./pages/Header"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route,Routes } from "react-router-dom";
import Cards from './pages/Cards'
import CardsDetails from './pages/CardsDetails'


function App() {
  return (
    <>
        <Header/>
        <Routes>
            <Route path="/Khans-sons/" element={<Cards/>}/>
            <Route path="/cart/:id" element={<CardsDetails/>}/>
        </Routes>
    </>
  );
}

export default App;
