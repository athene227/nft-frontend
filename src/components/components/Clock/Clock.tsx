import React, { useEffect, useState } from 'react';

import classes from './Clock.module.scss';

interface IProps {
  className?: string;
  deadline: Date;
  onTimeout?: () => void;
}

const Clock = (props: IProps) => {
  const initialTime = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  const [time, setTime] = useState(initialTime);
  const [notifiedTimeout, setNotifiedTimeout] = useState(false);
  const { deadline, className, onTimeout } = props;
  let interval: any;
  useEffect(() => {
    getTimeUntil(deadline);
    interval = setInterval(() => getTimeUntil(deadline), 1000);
  }, []);

  const leading0 = (num: number) => {
    return num < 10 ? '0' + num : num;
  };

  const getTimeUntil = (deadline: Date) => {
    const time = Date.parse(deadline) - Date.parse(new Date());
    if (time < 0) {
      setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      if (!notifiedTimeout) {
        clearInterval(interval);
        onTimeout && onTimeout();
        setNotifiedTimeout(true);
      }
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      setTime({ days, hours, minutes, seconds });
    }
  };

  return (
    <div className={`${classes.clock} ${className}`}>
      <div className={`${classes.clock_days}`}>{leading0(time.days)}d</div>
      <div className={`${classes.clock_hours}`}>{leading0(time.hours)}h</div>
      <div className={`${classes.clock_minutes}`}>
        {leading0(time.minutes)}m
      </div>
      <div className={`${classes.clock_seconds}`}>
        {leading0(time.seconds)}s
      </div>
    </div>
  );
};

export default Clock;
