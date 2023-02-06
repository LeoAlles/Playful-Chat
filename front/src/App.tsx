import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from './Components/Navegation/Navbar'; 
import Home from './Pages/Home/Home'
import RoomSearch from './Pages/Rooms/Search/RoomSearch'

function App() {
  return (
    <>
      <Navbar/>
        <Routes>
          <Route path="/" element={ <Home/>}></Route>
          <Route path="/rooms/search" element={ <RoomSearch/>}></Route>
        </Routes>
    </>
  );
}

export default App;
