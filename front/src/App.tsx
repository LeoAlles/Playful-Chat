import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from './Components/Navegation/Navbar'; 
import Home from './Pages/Home/Home'
import RoomSearch from './Pages/Rooms/Search/RoomSearch'
import Room from './Pages/Rooms/Room/Room'
import CouponForm from './Pages/Coupon/CouponCreateForm';
import CouponSearch from './Pages/Coupon/CouponSearch';
import CreateGame from './Pages/Games/CreateGame';
import GamesSearch from './Pages/Games/SearchGames';
import CreateUser from './Pages/Home/CreateUser'
import CreateRoom from './Pages/Rooms/Room/CreateRoom';
import Chat from './Pages/Rooms/Room/Chat';

function App() {
  return (
    <>
      <Navbar/>
        <Routes>
          <Route path="/" element={ <Chat/>}></Route>
          <Route path="/rooms/search" element={<RoomSearch/>}></Route>
          <Route path="/rooms/:id" element={<Room/>}></Route>
          <Route path="/coupons/create" element={<CouponForm/>}></Route>
          <Route path="/coupons/search" element={<CouponSearch/>}></Route>
          <Route path="/games/create" element={<CreateGame/>}></Route>
          <Route path="/games/search" element={<GamesSearch/>}></Route>
          <Route path="/users/create" element={<CreateUser/>}></Route>
          <Route path="/rooms/create" element={<CreateRoom/>}></Route>
        </Routes>
    </>
  );
}

export default App;
