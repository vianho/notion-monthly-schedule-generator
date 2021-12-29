import { DAYS, PEOPLE, INTERVALS, METHODS, GROUPS } from './constants.js'

const schedules = [
	{
		"Description": "message mom@1900 everyday",
		"Person": PEOPLE[0],
		"Interval": INTERVALS["d"],
		"Methods" : METHODS["msg"],
		"Time" : new Date(2022, 0, 1, 19),
	},
	{
		"Description" : "call mom every sunday@1500",
		"Person": PEOPLE[0],
		"Interval": INTERVALS["w"],
		"Days": [{ "Day": DAYS[0], "Time" : new Date(2022, 0, 1, 15)}],
		"Methods": METHODS["vc"],
	},
	{
		"Description" : "visit grandma every month (generate a random sunday and adjust according to schedule)",
		"Person": PEOPLE[4],
		"Interval": INTERVALS["m"],
		"Days": [{ "Day": DAYS[0], "Time" : new Date(2022, 0, 1, 17)}],
		"Methods": METHODS["f2f"],
	},
	{
		"Description" : "Meet f2f with  Mr Hee every week",
		"Person": PEOPLE[18],
		"Interval": INTERVALS["w"],
		"Days": [{ "Day": DAYS[6], "Time" : new Date(2022, 0, 1, 9)}],
		"Methods": METHODS["f2f"],
	},
	{
		"Description" : "Update Mr Hee everyday on WhatsApp",
		"Person": PEOPLE[18],
		"Interval": INTERVALS["dwd"],
		"Methods" : METHODS["msg"],
		"Time" : new Date(2022, 0, 1, 9),
		"Message": "What was accomplished yesterday, todo list for today, other important info",
	},
	{
		"Description" : "Send Invoice to Eva every month",
		"Person": PEOPLE[20],
		"Interval": INTERVALS["m"],
		"Methods": METHODS["em"],
		"DaysOfMonth": [{ "Date": 19, "Time" : new Date(2022, 0, 1, 9)}],
	},
]

export { schedules }
