import React, { useEffect, useState } from 'react';

const Reloj = () => {

    const [hour,setHour] = useState(new Date().getHours());
    const [minute,setMinute] = useState(new Date().getMinutes());
    const [seconds,setSeconds] = useState(new Date().getSeconds());

    useEffect(()=>{
        setInterval(() => {
            setHour(new Date().getHours());
            setMinute(new Date().getMinutes());
            setSeconds(new Date().getSeconds());
        }, 999);
    },[]);

    return (
        <div className='reloj'>
            <section>
                <div className='clock'>
                    <div className='container'>
                        <h2 id='hour'>{ 
                            hour > 12 ?
                                hour - 12 < 10 ?
                                    `0${hour-12}`
                                :
                                    hour-12
                            : 
                                hour < 10 ?
                                    `0${hour}`
                                :
                                    hour
                        }</h2>
                        <h2 className='dot'>:</h2>
                        <h2 id='minute'>{ 
                            minute < 10 ?
                                `0${minute}`
                            :
                                minute
                        }</h2>
                        <h2 className='dot'>:</h2>
                        <h2 id='seconds'>{ 
                            seconds < 10 ?
                                `0${seconds}`
                            :
                                seconds
                        }</h2>
                        <span id='ampm'>{
                            hour > 12 ?
                                'PM'
                            :
                                'AM'
                        }</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Reloj;