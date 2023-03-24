import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

const DetailsPlanets = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [planets, setPlanets] = useState({})

    useEffect(() => {
        const cargaDatos = async () => {
            let { respuestaJson, response } = await actions.useSwapi(`/planets/${params.uid}`)
            if (response.ok) {
                setPlanets(respuestaJson.result.properties)
            }
        }
        cargaDatos()

    }, [params.uid])

    return (<>
        <div className="container-fluid bg-dark p-5">
            <div className="d-flex justify-content-center mt-3">
                <div className="card mb-3" style={{ width: "75%" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={`https://starwars-visualguide.com/assets/img/planets/${params.uid}.jpg`}
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg' }}
                                className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h1 className="card-title text-center">{planets.name}</h1>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                <p className="card-text"><small className="text-muted">Gravity: {planets.gravity}<br />Terrain: {planets.terrain} <br />Climate: {planets.climate} <br />Orbital Period: {planets.orbital_period} <br />Population: {planets.population} <br />Diameter: {planets.diameter} </small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="button d-flex justify-content-center p-5"> 
            <Link to="/"><button type="button" className="btn btn-warning text-dark"><strong>Go back</strong></button></Link>
            </div>
        </div>
    </>)
}

export default DetailsPlanets