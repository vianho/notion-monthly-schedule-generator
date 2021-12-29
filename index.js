import { Client } from "@notionhq/client";
import dotenv from "dotenv";

import {
  schedules,
} from "./schedules.js";

import {
  DAYS,
  PEOPLE,
  INTERVALS,
  METHODS,
  GROUPS
} from "./constants.js";

import {
  getKeyByValue,
  getDateTime,
  getDates,
  getNextMonth,
  daysInMonth,
} from "./utils.js";

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

const nextMonth = getNextMonth();
const totalDays = daysInMonth(nextMonth.getMonth(), nextMonth.getFullYear());

const getGroup = (person) => {
  const person_id = parseInt(getKeyByValue(PEOPLE, person));
  for (const group in GROUPS) {
    if (GROUPS[group].includes(person_id)) {
      return group;
    }
  }
  return "Others";
};

const basicScheduleInput = (schedule_obj) => {
  const schedule = {
    parent: { database_id: databaseId },
    properties: {
      Person: {},
      Interval: {},
      Method: {},
      Group: {},
      Time: {},
      Message: {
        rich_text: [
          {
            type: "text",
            text: { content: "" },
          },
        ],
      },
    },
  };

  schedule.properties.Person = {
    title: [
      {
        text: { content: schedule_obj["Person"] },
      },
    ],
  };

  schedule.properties["Interval"] = {
    select: {
      name: schedule_obj["Interval"],
    },
  };

  schedule.properties["Method"] = {
    select: {
      name: schedule_obj["Methods"],
    },
  };

  schedule.properties["Group"] = {
    select: {
      name: getGroup(schedule_obj["Person"]),
    },
  };

  return schedule;
};

const generateDailySchedule = (schedule_obj) => {
  const schedules = [];
  const basic_schedule = () => basicScheduleInput(schedule_obj);

  const time = schedule_obj["Time"];

  // get the dates of every specific day of the month
  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i);
    const schedule = basic_schedule();
    schedule.properties["Time"] = getDateTime(date, time);
    schedules.push(schedule);
  }

  return [schedules, schedule_obj["Description"]];
};

const generateWeeklySchedule = (schedule_obj) => {
  const schedules = [];
  const basic_schedule = () => basicScheduleInput(schedule_obj);

  const days = schedule_obj["Days"];

  // get the dates of every specific day of the month
  days.forEach((dayTime) => {
    const day = dayTime["Day"];
    const time = dayTime["Time"];

    const dates_day = getDates(
      day,
      nextMonth.getMonth(),
      nextMonth.getFullYear(),
      totalDays
    );

    dates_day.forEach((date) => {
      const schedule = basic_schedule();
      schedule.properties["Time"] = getDateTime(date, time);
      schedules.push(schedule);
    });
  });
  return [schedules, schedule_obj["Description"]];
};

// TODO
const generateBiweeklySchedule = (schedule_obj) => {
  const schedules = [];
  const schedule = basicScheduleInput(schedule_obj);

  return schedules;
  return schedules, schedule_obj["Description"];
};

const generateDailyWeekdaysSchedule = (schedule_obj) => {
  const schedules = [];
  const basic_schedule = () => basicScheduleInput(schedule_obj);

  const days = DAYS;
  const time = schedule_obj["Time"];

  // get the dates of every specific day of the month
  for (const idx in days) {
    if (idx == 0 || idx == 6) {
      continue;
    }
    const day = days[idx];
    const dates_day = getDates(
      day,
      nextMonth.getMonth(),
      nextMonth.getFullYear(),
      totalDays
    );

    dates_day.forEach((date) => {
      const schedule = basic_schedule();
      schedule.properties["Time"] = getDateTime(date, time);
      schedules.push(schedule);
    });
  }

  return [schedules, schedule_obj["Description"]];
};

const generateMonthlySchedule = (schedule_obj) => {
  const schedules = [];
  const basic_schedule = () => basicScheduleInput(schedule_obj);

  if (schedule_obj["Days"] && schedule_obj["DaysOfMonth"]) {
    console.log("You cannot have both Days and DaysOfMonth.");
    throw new Error("You cannot have both Days and DaysOfMonth.");
  }

  if (schedule_obj["Days"]) {
    const days = schedule_obj["Days"];
    // get the dates of every specific day of the month
    days.forEach((dayTime) => {
      const day = dayTime["Day"];
      const time = dayTime["Time"];
      const dates_day = getDates(
        day,
        nextMonth.getMonth(),
        nextMonth.getFullYear(),
        totalDays
      );

      // pick one random date from a list
      const date = dates_day[Math.floor(Math.random() * dates_day.length)];
      const schedule = basic_schedule();
      schedule.properties["Time"] = getDateTime(date, time);
      schedules.push(schedule);
    });
  } else if (schedule_obj["DaysOfMonth"]) {
    const days = schedule_obj["DaysOfMonth"];
    // get the dates
    days.forEach((dayTime) => {
      const day = dayTime["Date"];
      const time = dayTime["Time"];

      const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day);

      const schedule = basic_schedule();
      schedule.properties["Time"] = getDateTime(date, time);
      schedules.push(schedule);
    });
  }

  return [schedules, schedule_obj["Description"]];
};

const addSchedule = async (processed_schedule) => {
  try {
    await notion.pages.create(processed_schedule);
    // console.log(response);
  } catch (error) {
    console.log(
      processed_schedule.properties.Person,
      processed_schedule.properties.Time
    );
    console.error(error.body);
  }
};

const main = () => {
  schedules.forEach((schedule_obj) => {
    let processed_schedule = [];
    let desc = "";
    let generatorFn = () => null;

    if (schedule_obj["Interval"] === INTERVALS["d"]) {
      generatorFn = generateDailySchedule;
    } else if (schedule_obj["Interval"] === INTERVALS["w"]) {
      generatorFn = generateWeeklySchedule;
    } else if (schedule_obj["Interval"] === INTERVALS["bw"]) {
      generatorFn = generateBiweeklySchedule;
    } else if (schedule_obj["Interval"] === INTERVALS["dwd"]) {
      generatorFn = generateDailyWeekdaysSchedule;
    } else if (schedule_obj["Interval"] === INTERVALS["m"]) {
      generatorFn = generateMonthlySchedule;
    } else {
      console.log("Invalid interval.");
      throw new Error("Invalid interval.");
    }

    [processed_schedule, desc] = generatorFn(schedule_obj);
    let l = [];
    processed_schedule.forEach((s) => {
      l.push(s.properties.Time.date.start.slice(8, 10));
    });
    console.log(desc);
    console.log("dates to be added " + l.sort());
    console.log("number of items to be added: " + l.length);

    if (processed_schedule.length > 0) {
      processed_schedule.forEach((s) => addSchedule(s));
    }
  });
};

// const test = () => {
//   schedules.forEach((schedule_obj) => {
//     let processed_schedule = [];
//     if (schedule_obj["Interval"] === INTERVALS["m"]) {
//       processed_schedule = generateMonthlySchedule(schedule_obj);
//     } else {
//       console.log("Invalid interval.");
//     }

//     if (processed_schedule.length > 0) {

//       processed_schedule.forEach((s) => addSchedule(s));
//     }
//   });
// };
// console.log("==============================================");
// test();

main();
