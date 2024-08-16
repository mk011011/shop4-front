import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Detail from './routes/Detail';
import Cart from './routes/Cart';

function App() { 
  
  return (
    <>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/detail/:id' element={<Detail/>}/>
          <Route path='/cart' element={<Cart/>} />
        </Routes>
        <Footer/>
    </>
  );
}

export default App;
