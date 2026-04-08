import React from "react";
import { useState, useEffect } from "react"
import CounterDisplay from "./CounterDisplay";
import CounterControls from "./CounterControls";

// TODO: Use useState to manage counter
// TODO: Use useEffect to show a message when counter > 5
// TODO: Use useEffect to reset counter to 0 if it becomes negative
// TODO: Pass counter value to CounterDisplay as a prop
// TODO: Pass increment/decrement functions to CounterControls as props
function CounterPage() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1)

  useEffect(() => {
    if (count < 0) {
      setCount(0);
    }
  }, [count])

  useEffect(() => {
    if (count > 5) {
      console.log("Count is greater than 5");
    }
  }, [count])

  return (
    <div>
      <CounterDisplay count={count}/>
      <CounterControls increment={increment} decrement={decrement}/>
      {count > 5 && <p>You passed 5!</p>}
    </div>
  );
}

export default CounterPage;