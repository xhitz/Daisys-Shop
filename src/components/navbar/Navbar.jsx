import React from 'react'
import './navbar.css'
import {  Link } from "react-router-dom";
import {useContractKit} from "@celo-tools/use-contractkit";

const Navbar = () => {
  
  const {address, destroy, connect} = useContractKit();

  return (
    <div className='navbar'>
      <div className="navbar-links">
        <div className="navbar-links_logo">       
          <Link to="/">
            <h1>Daisy's One Stop Shop</h1>
          </Link>
        </div>
        <div className="navbar-links_container">
          <Link  className='stuff'  to="/profile">
            <p>MY COLLECTION</p>
          </Link>
          <Link to="/create">
            <p>CREATION LABZ</p>
          </Link>
        </div>
      </div>
      <div className="navbar-sign">
      
      {!address ? (
        <>
        <button type='button' className='secondary-btn' onClick={connect}>CONNECT</button>
        </>
      ) : (
        <>
          <button type='button' onClick={destroy} className='secondary-btn'>
            LOGOUT
          </button>  
        </>
      )}
      </div>
    </div>
  )
}

export default Navbar
