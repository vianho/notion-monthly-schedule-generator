import {
  DAYS,
} from "./constants.js";

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
}

const getDateTime = (date, time) => {
  const [day, month, year] = [
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
  ];
  const [hour, minutes] = [time.getHours(), time.getMinutes()];

  // const dateTime = new Date(year, month, day, hour, minutes);

  const twoDigitFormat = num => num.toString().padStart(2, "0");
  const datestring = `${year}-${twoDigitFormat(month+1)}-${twoDigitFormat(day)}T${twoDigitFormat(hour)}:${twoDigitFormat(minutes)}:00+0800`

  return {
    date: {
      start: datestring,
    },
  };
};

const getDates = (day, month, year, totalDays) => {
  const dates = [];

  // get the first date of the day
  let first_date;
  for (let i = 1; i <= 8; i++) {
    // looping through days in month & append the first date of the day
    let day_id = getKeyByValue(DAYS, day);
    let newDate = new Date(year, month, i);

    if (newDate.getDay() == day_id) {
      first_date = newDate;
      break;
    }
  }

  // generate dates
  let addition = 0;
  while (first_date.getDate() + addition <= totalDays) {
    dates.push(new Date(year, month, first_date.getDate() + addition));
    addition += 7;
  }

  return dates;
};

const getNextMonth = () => {
  let now = new Date();
  if (now.getMonth() == 11) {
    return new Date(now.getFullYear() + 1, 0, 1);
  } else {
    return new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }
};

const daysInMonth = (month, year) => {
  // +1 will retutn the current month
  return new Date(year, month + 1, 0).getDate();
}

export { getKeyByValue, getDateTime, getDates, getNextMonth, daysInMonth };
