import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const SinglePlanet = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [planet, setPlanet] = useState({})

    useEffect(() => {
        const cargaDatos = async () => {
            let { respuestaJson, response } = await actions.useFetch(`/planets/${params.uid}`)
            if (response.ok) {
                console.log(respuestaJson)
                setPlanet(respuestaJson.result.properties)
            }
        }
        cargaDatos()

    }, [])

    return (<>
        <div className="container card d-flex justify-content-center align-items-center">
            Soy {planet.name ? planet.name : ""} con el uid {params.uid} y mi género es {planet?.gender}
        </div>
    </>)
}

export default SinglePlanet