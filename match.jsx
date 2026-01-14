import React from 'react'

export default function Match() {

  function HandleSubmit(event) {
    

  }


  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" required /><br/>

        <label htmlFor="name">match: </label>
        <input type="number" id="match" name="match" required /><br/>

        <button type="submit">SUBMIT</button>
      </form>


    </div>
  )
}
