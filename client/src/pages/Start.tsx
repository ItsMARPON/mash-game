import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Home from './Home';
import Profile from './Profile';

export interface Props = {
  handlePageChange: ()=> void;
  displayPage: ()=> void;
  setDisplayPage: ()=> void;
}
export const Start = (props: Props) => {

  const [displayPage, setDisplayPage] = useState("Start");

  const renderPage = () => {
    if (displayPage === 'Home'){
      return <Home />;
    }
    if(displayPage === 'Profile'){
      return <Profile />
    }
    return <Start />
  };

  const handlePageChange = (page) => setDisplayPage(page);

  return (
    <div>
      <h1>MASH GAME</h1>
      <span>
      <p>Bored and curious about MASH? Give MASH a try and play the game to enjoy a few good laughs and moments doing something fun.</p>
      </span>
      <span>
      <p>Returning player? Login to view your saved Games and share with friends.</p>
      </span>
      <Navbar displayPage={displayPage} handlePageChange={handlePageChange} />
      {renderPage()}
    </div>
  )
}
