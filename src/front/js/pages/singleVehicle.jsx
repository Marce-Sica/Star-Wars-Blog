import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const SingleVehicle = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [vehicle, setVehicle] = useState({})

    useEffect(() => {
        const cargaDatos = async () => {
            let { respuestaJson, response } = await actions.useFetch(`/vehicles/${params.uid}`)
            if (response.ok) {
                console.log(respuestaJson)
                setVehicle(respuestaJson.result.properties)
            }
        }
        cargaDatos()

    }, [])

    return (<>
        <div className="container card d-flex justify-content-center align-items-center">
            Soy {vehicle.name ? vehicle.name : ""} con el uid {params.uid} y mi género es {vehicle?.gender}
        </div>
    </>)
}

export default SingleVehicle