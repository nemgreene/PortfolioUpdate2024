import moment from "moment";
import { useEffect, useState } from "react";
import Typewriter from "./Typewriter";

export default function Clock() {
  const [number, setNumber] = useState(
    `${moment().format("HH:mm:ss")} ${moment.tz().format("Z z")}`
  );
  const [elem, api] = Typewriter(number);
  useEffect(() => {
    api.start();
    const timer = window.setInterval(() => {
      setNumber(`${moment().format("HH:mm:ss")} ${moment.tz().format("Z z")}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return elem;
}
