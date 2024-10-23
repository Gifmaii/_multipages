import React, {  useEffect, useState } from 'react';
import Variable from '../Variable/Variable';
import './Temperatures.css';

function Temperatures() {

    const [celsius, setCelsius] = useState(25);
    const [fahrenheit, setFahrenheit] = useState(celsius * 1.8 + 32);
    const [kelvin, setKelvin] = useState(celsius + 273.15);


    useEffect(() => {
        setFahrenheit(celsius * 1.8 + 32);
        setKelvin(celsius + 273.15);
    }, [celsius]);


    useEffect(() => {
        setCelsius((fahrenheit - 32) / 1.8);
    }, [fahrenheit]);


    useEffect(() => {
        setCelsius(kelvin - 273.15);
    }, [kelvin]);


    return ( 
        <div className='container-Temperatures'>
            <h3 className='Temperatures-title'> Temperatures</h3>
            <h3 className='Temperatures-display'> 
                <span className='badge bg-primary'>{celsius.toFixed(2)}°C</span> 
                <span className='badge bg-primary'>{fahrenheit.toFixed(2)}°F</span>
                <span className='badge bg-primary'>{kelvin.toFixed(2)}°K</span>
            </h3>
            <div className='variable-container'>
                <Variable name={'Celsius'} value={celsius} setValue={setCelsius} />
                <Variable name={'Fahrenheit'} value={fahrenheit} setValue={setFahrenheit} />
                <Variable name={'Kelvin'} value={kelvin} setValue={setKelvin} />
            </div>

        </div>
     );
}

export default Temperatures;