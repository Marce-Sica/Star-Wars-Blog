import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

const CardPlanet = () => {
    const { store, actions } = useContext(Context);
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        if (store.initialFetch.length > 0) {
            setPlanets(store.initialFetch[2]);
        }
    }, [store.initialFetch]);

    const addToFavorites = (item) => {
        actions.addFavorite(item);
    };

    return (
        <>
            <div className="container-fluid p-5 bg-dark">
                <div className="card-container d-flex flex-nowrap">
                    {planets && planets.length > 0 ? (
                        <>
                            {planets.map((item, index) => {
                                return (
                                    <div className="card-wrapper " key={item.uid}>
                                        <div className="card bg-dark border-light" style={{ width: "250px" }}>
                                            <img
                                                src={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`}
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg' }}
                                                className="card-planets card-img-top border border-light"
                                                alt="..."
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title text-light">{item.name}</h5>

                                                <p className="card-text text-light">
                                                    Some quick example text to build on the card title and
                                                    make up the bulk of the card's content.
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <Link to={`/planets/${item.uid}`} className="btn btn-light text-dark">
                                                        Learn More!
                                                    </Link>
                                                    <button type="button" className="btn bg-danger" onClick={() => {
                                                        let urlPath = { ...item, url: "/planets/" };
                                                        addToFavorites(urlPath);
                                                    }}><i className="fa-regular fa-heart"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <h1>Loading</h1>
                    )}
                </div>
            </div>
        </>
    );
};

export default CardPlanet;