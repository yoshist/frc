import React from 'react';
import '../styles/form.css';
import { useState } from 'react';
import {useLocalStorage } from 'react-use';

export default function Settings() {

    const [settingData, setSettingData] = useState({
        event_key: ""
    });

    const [tbaData, setTbaData] = useLocalStorage('tbaData', {});


   function handleChange(event){
        const {name, value} = event.target;

        setSettingData(prevState => ({
        ...prevState,
        [name]: value
        }));
    }

    
    async function handleFetchData(event) {
        event.preventDefault();

        try {
            console.log(settingData);

            // Use API call to fetch data
            const response = await fetch(
                `${import.meta.env.VITE_TBA_BASE_URL}/event/${settingData.event_key}/matches`, 
                {
                    method: "GET",
                    headers: {
                        'X-TBA-Auth-Key': import.meta.env.VITE_TBA_API_TOKEN
                    },
                }
            );

            if (!response.ok) {
                let errorMessage;

                switch (response.status) {
                    case 400:
                    errorMessage = "Bad request. The event key may be invalid.";
                    break;
                    case 401:
                    errorMessage = "Unauthorized. Check your TBA API key.";
                    break;
                    case 403:
                    errorMessage = "Forbidden. You do not have access to this resource.";
                    break;
                    case 404:
                    errorMessage = "Event not found. Verify the event key.";
                    break;
                    case 429:
                    errorMessage = "Too many requests. You are being rate limited.";
                    break;
                    case 500:
                    errorMessage = "Server error from The Blue Alliance.";
                    break;
                    default:
                    errorMessage = `Unexpected error (${response.status}): ${response.statusText}`;
                }

                throw new Error(errorMessage);
            }

            const jsonData = await response.json();

            console.log(jsonData);

            // Process data
            const mapping = {};

            for(const m of jsonData) {
                const id = m.key;
                mapping[id] = m;
            }
            console.log(mapping);

            const newTbaData = { ...tbaData, [settingData.event_key]: mapping };
            setTbaData(newTbaData);

        } catch (error) {
            console.error("Failed to fetch match data:", error.message);
        }  

    }

    // const events = [];
	// let index = 0;
	// if(updateTimes) {
	// 	for(const [eventKey, time] of Object.entries(updateTimes)) {
	// 		events.push(
	// 			<div className="updateTime" key={`updateTime${index++}`}>
	// 				<h1 className="updateTime__title">{eventKey}:</h1>
	// 				<p className="updateTime__timestamp">{time}</p>
	// 			</div>
	// 		);
	// 	}
	// }

    function handleClear(event){
        event.preventDefault();
        console.log("Clear Data");
    }

    return (
        <div className="form-container">
            <form className="form-card" >
                <div className="form-group" style={{ padding: '20px', height: '0vh'}}>
                    <label htmlFor="event_key">Event Key</label>
                    <input
                        id="event_key"
                        name="event_key"
                        type="text"
                        value={settingData.event_key}
                        onChange={handleChange}
                        required />
                </div>

                <div className="button-row" style={{padding: '20px'}}>
                    <button type="button" className="submit-button" onClick={handleClear}>Clear Data</button>
                    <button type="button" className="submit-button" onClick={handleFetchData}>Fetch Data</button> 
                </div>
                <div style={{backgroundColor: 'lightblue', padding: '20px', height: '20vh'}}>
                    Display fetched data status here (event key and the date/time the data was last fetched)
                </div>
                
            </form>
        </div>
    );
}
