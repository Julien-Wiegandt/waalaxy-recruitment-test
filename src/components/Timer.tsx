import React, { useEffect, useState } from "react";
import "./Timer.css";

type props = {
  reloadCredits: () => number;
};

function Timer(props: props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [reloadDate, setReloadDate] = useState(() => {
    const localData = localStorage.getItem("reloadDate");
    return localData ? new Date(JSON.parse(localData)) : new Date("2000/01/01");
  });
  const [timer, setTimer] = useState(1440);

  // Set current date
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  // Store in localStorage on reloadDate change
  useEffect(() => {
    localStorage.setItem("reloadDate", JSON.stringify(reloadDate));
  }, [reloadDate]);

  // Check if 24h past between currentDate and reloadDate
  useEffect(() => {
    setTimer(Math.trunc(1440 - (currentDate.getTime() - reloadDate.getTime()) / 60000));
    if ((currentDate.getTime() - reloadDate.getTime()) / (1000 * 60 * 60) >= 24) {
      props.reloadCredits();
      setReloadDate(currentDate);
    }
  }, [currentDate, reloadDate]);

  // Handle timer
  useEffect(() => {
    if (timer === 0) {
      setTimer(1440);
      props.reloadCredits();
      setReloadDate(new Date());
    } else {
      const counter = setInterval(() => setTimer(timer - 1), 60000);
      return () => clearInterval(counter);
    }
  }, [timer]);

  return (
    <div>
      <h2>Credits reload timer</h2>
      <p className="timer">
        {Math.trunc(timer / 60)} H {timer - Math.trunc(timer / 60) * 60} MIN
      </p>
    </div>
  );
}

export default Timer;
