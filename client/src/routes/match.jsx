import React from 'react'
import '../styles/form.css';
import { useState } from 'react';
import {QRCode, Button, Divider } from 'antd';

export default function Match() {
  const [matchData, setMatchData] = useState ({
    team: "",
    scouter_initials: "",
    match_level: "Qualifications",
    match_number: "",
    robot_position: "B1",
    climb_successful: false,
    team_number: ""
  });

  function handleChange(event){
    const {name, value, type, checked} = event.target;

    setMatchData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  const [showQR, setShowQR] = useState(false);

  function handleSubmit(event) {
      event.preventDefault();
      setShowQR(true);  // show QR after submit
      console.log(matchData);
  }

  // Specify the order of values
  const qrValue = [
    matchData.scouter_initials,
    matchData.match_level,
    matchData.match_number,
    matchData.robot_position,
    matchData.climb_successful ? 1 : 0
  ].join('\t');

  return (
    <div className="form-container">
      {/* Call the handleSubmit function upon clicking on the Submit button. */}
      <form className="form-card" onSubmit={handleSubmit}>  

        <div className="form-group">
          <label>Team</label>
          <input
            id="team"
            name="team"
            type="number"
            value={matchData.team}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="scouter_initials">Scouter Initials</label>
          <input 
            id="scouter_initials" 
            name="scouter_initials" 
            type="text" 
            minLength={2}
            maxLength={3}
            value={matchData.scouter_initials} 
            onChange={handleChange} 
            required />
        </div>

        <div className="form-group">
          <label htmlFor="match_level">Match Level</label>
          <select 
            id="match_level"
            name="match_level"
            value={matchData.match_level}
            onChange={handleChange}
            >
              <option value="Qualifications">Qualifications</option>
              <option value="Playoffs">Playoffs</option>
              <option value="Finals">Finals</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="match-event">Match Number</label>
          <input 
            id="match_number" 
            name="match_number" 
            type="number" 
            min = {1}
            max = {5}
            value={matchData.match_event}
            onChange={handleChange}
            required />
        </div>

        <div className="form-group">
          <label htmlFor="match_level">Robot Position</label>
          <select 
            id="robot_position"
            name="robot_position"
            value={matchData.robot_position}
            onChange={handleChange}
            >
              <option value="R1">R1</option>
              <option value="R2">R2</option>
              <option value="R3">R3</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="B3">B3</option>
          </select>
        </div>

       <div className="form-group">
          <label htmlFor="climb_successful">Climb Successful?</label>
          <input 
            id="climb_successful" 
            name="climb_successful" 
            type="checkbox" 
            checked={matchData.climb_successful} 
            onChange={handleChange}  />
        </div>

        <button type="submit" className="submit-button">Submit</button>

        {showQR && (
          <>
            <Divider>Scan Match Data</Divider>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
              <QRCode
                // value={JSON.stringify(matchData)}
                value={qrValue}
                size={200}
                bordered
                />
            </div>
          </>
        )}

      </form>
    </div>

  )
}
