import React from "react";

// TODO: Receive increment/decrement functions as props
// TODO: Add buttons for Increase and Decrease
// Description: Provides buttons to change the counter value
function CounterControls({ increment, decrement}) {
  return <div>
    <button onClick={increment}>Increase</button>
    <button onClick={decrement}>Decrease</button>
  </div>;
}

export default CounterControls;