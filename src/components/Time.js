import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";

const Time = () => {

    const [ weather, setWeather ] = useState({})
    const [isShowing, setIsShowing] = useState(true);
    

    
    const succese = pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c2e3d8e24a6f008f4ae3c2ec20a700af`).then( res => setWeather(res.data))
        
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(succese);
    }, [])


    return (
        <div>
            <div className='card'>
                <h1> Weather time App </h1>
                <p>{weather.name} {weather.sys?.country}</p>
                <section className='data'>
                    <div>
                        <img className='img' alt='image time' src={ `http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png` }/>
                    </div>
                    <div>
                        <p>"{weather.weather?.[0].description}" </p>
                        <p> Wind speed: {weather.wind?.speed} </p>
                        <p>Humedity: {weather.main?.humidity}%</p>
                        <p>Temperature: {isShowing ? `${Math.round((weather.main?.temp-273.15))} °C` : `${Math.round(((weather.main?.temp- 73.15)*9/5+32))} °F`} </p>
                    </div>
                </section>
                <button onClick={() => setIsShowing(!isShowing)}>Change to: {isShowing ? "°F" : "°C"}</button>
            </div>

        </div>
    );
};
export default Time;