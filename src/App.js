import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import Detail from './routes/Detail';
import { listGoods } from './services/GoodsService';
import Cart from './routes/Cart';
// rface
function App() { 
  //안녕
  let [data, setData] = useState([])

  useEffect(()=>{
    let watched = sessionStorage.getItem('watched')
    !watched && sessionStorage.setItem('watched',JSON.stringify([]))
  }, [])
  
  useEffect(()=>{
    getAllGoods();
  },[])

  function getAllGoods(){
    listGoods().then((response)=>{
        setData(response.data);
    }).catch(error=>{
        console.error(error);
    })
  }
  return (
    <>
        <Header/>
        <Routes>
          <Route path='/' element={<Home shoes={data}/>}/>
          <Route path='/detail/:id' element={<Detail />}/>
          <Route path='/cart' element={<Cart/>} />
        </Routes>
        <Footer/>
    </>
  );
}

export default App;
