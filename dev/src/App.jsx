import {useEffect, useState} from "react";

import './App.scss'
import api from './api.js'

export default function App() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);
        api.getWeather()
            .then((response) => {
                if (!isMounted) return;
                setData(response);
            })
            .catch((err) => {
                if (!isMounted) return;
                setError(err);
            })
            .finally(() => {
                if (!isMounted) return;
                setLoading(false);
            });
        return () => {
            isMounted = false;
        }
    }, [])


    return (
        <main>
            { loading && <h4>Loading...</h4>}
            { error && <h4>Error: {error.message}</h4>}
            { data && (
                <section>
                    <h3>{data?.location?.name}, {data?.location?.country}</h3>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <img src={data?.current?.condition?.icon?.startsWith('http') ? data.current.condition.icon : `https:${data?.current?.condition?.icon}`} alt={data?.current?.condition?.text} />
                        <div>
                            <div style={{fontSize: '28px', fontWeight: 600}}>{Math.round(data?.current?.temp_c)}°C</div>
                            <div>{data?.current?.condition?.text}</div>
                        </div>
                    </div>
                    <div style={{marginTop: '8px'}}>
                        <span>Feels like: {Math.round(data?.current?.feelslike_c)}°C</span>
                        <span style={{marginLeft: '12px'}}>Wind: {Math.round(data?.current?.wind_kph)} kph</span>
                        <span style={{marginLeft: '12px'}}>Humidity: {data?.current?.humidity}%</span>
                    </div>
                </section>
            )}
        </main>
    )
}
