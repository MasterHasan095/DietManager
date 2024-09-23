import React, { useState, useEffect } from "react";
import "../styles/tracker.css";
const Tracker = () => {
  const [trackerValue, setTrackerValue] = useState("50/50");

  useEffect(() => {
    // Define the values to cycle through
    const values = ["50/50", "25/50", "75/75"];
    let index = 0;

    // Set up an interval to update the state every 5 seconds
    const interval = setInterval(() => {
      index = (index + 1) % values.length; // Cycle through the values
      setTrackerValue(values[index]);
    }, 2000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="trackerholder">
      <p>{trackerValue}</p> 
    </div>
  );
};

export default Tracker;
