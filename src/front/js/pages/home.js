import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import CardPeople from "../component/cardPeople.jsx";
import CardPlanet from "../component/cardPlanet.jsx";
import CardVehicle from "../component/cardVehicle.jsx";


export const Home = () => {
  return (
    <>
    <div className="bg-dark">
      <br></br> <br></br>
      <h1 className="text-warning text-center mb-2 bg-dark">Characters</h1>
      <CardPeople />
      <h1 className="text-warning text-center mt-2 mb-2 bg-dark">Planets</h1>
      <CardPlanet />
      <h1 className="text-warning text-center mt-2 mb-2 bg-dark">Vechicles</h1>
      <CardVehicle />
      </div>
    </>

  );
};