import React from "react";

// TODO: Receive counter value as prop and display it
// Description: Shows the current value of the counter
function CounterDisplay({ count }) {
  return <div>
    <h2>Count: {count}</h2>
  </div>;
}

export default CounterDisplay;