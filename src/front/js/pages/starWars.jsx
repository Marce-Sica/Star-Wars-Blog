import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import CardPeople from "../component/cardPeople.jsx";
import CardPlanet from "../component/cardPlanet.jsx";
import CardVehicle from "../component/cardVehicle.jsx";


const StarWars = () => {
    const { store, actions } = useContext(Context)
    const [listPeople, setListPeople] = useState({})
    const [listVehicles, setListVehicles] = useState({})
    const [listPlanets, setListPlanets] = useState({})

    useEffect(() => {
        const cargaDatos = async () => {
            let { respuestaJson, response } = await actions.useFetch("/people")
            if (response.ok) {
                console.log(respuestaJson)
                setListPeople(respuestaJson.results)
            }

            ({ respuestaJson, response } = await actions.useFetch("/planets"))
            if (response.ok) {
                console.log(respuestaJson)
                setListPlanets(respuestaJson.results)
            }
            ({ respuestaJson, response } = await actions.useFetch("/vehicles"))
            if (response.ok) {
                console.log(respuestaJson)
                setListVehicles(respuestaJson.results)
            }


        }

        const cargaParalelo = async () => {
            let promesaPlanetas = actions.useFetchParalelo("/planets")
            let promesaPeople = actions.useFetchParalelo("/people")
            let promesaVehicles = actions.useFetchParalelo("/vehicles")

            let [a, b, c] = await Promise.all([promesaPlanetas, promesaPeople, promesaVehicles])

            a = await a.json()
            setListPlanets(a.results)

            b = await b.json()
            setListPeople(b.results)

            c = await c.json()
            setListVehicles(c.results)
        }
        cargaParalelo()

    }, [])

    useEffect(() => { }, [listPeople])
    useEffect(() => { }, [listPlanets])
    useEffect(() => { }, [listVehicles])

    return (<>
        Soy el componente personas de Star wars


        <div>
            <ul className="d-flex">
                {listPeople && listPeople.length > 0 ?
                    <>
                        {listPeople.map((item, index) => {
                            return <li className="p-3" key={item.uid}>
                                <CardPeople name={item.name} uid={item.uid} />
                            </li>
                        })}
                    </> : <></>}
            </ul>
        </div>
        <br />

        Soy el componente planetas de Star wars

        <div>
            <ul className="d-flex">
                {listPlanets && listPlanets.length > 0 ?
                    <>
                        {listPlanets.map((item, index) => {
                            return <li className="p-3" key={item.uid}>
                                <CardPlanet name={item.name} uid={item.uid} />
                            </li>
                        })}
                    </> : <></>}
            </ul>
        </div>

        <br />

        Soy el componente vehiculos de Star wars

        <div>
            <ul className="d-flex">
                {listVehicles && listVehicles.length > 0 ?
                    <>
                        {listVehicles.map((item, index) => {
                            return <li className="p-3" key={item.uid}>
                                <CardVehicle name={item.name} uid={item.uid} />
                            </li>
                        })}
                    </> : <></>}
            </ul>
        </div>


    </>)
}

export default StarWars