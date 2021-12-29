// some database thing
const DAYS = {
	0 : "Sunday",
	1 : "Monday",
	2 : "Tuesday",
	3 : "Wednesday",
	4 : "Thursday",
	5 : "Friday",
	6 : "Saturday",
}

const INTERVALS = {
	"d" : "Daily",
	"dwd" : "Daily (Weekdays)",
	"w" : "Weekly",
	"bw" : "Biweekly",
	"m" : "Monthly",
	"ot" : "One Time"
}

const METHODS = {
	"msg" : "Message",
	"vc" : "Voice Call",
	"vdc" : "Video Call",
	"em" : "Email",
	"om" : "Online Meeting",
	"f2f" : "F2F Meeting",
}

const GROUPS = {
	"Family" : [0, 1, 2, 3, 4],
	"ID Friends": [5, 6],
	"School": [7, 8, 9, 10, 11],
	"SG Friends": [12, 13, 14, 15, 16, 17],
	"Work": [18, 19, 20],
	"Online Friends": [21, 22, 23, 24, 25, 26],
	"Others": [27]
}

const PEOPLE = {
	0: "Mom",
	1: "Dad",
	2: "Brother",
	3: "Family (maternal)",
	4: "Family (paternal)",
	5: "Siltan, JeYeo, Mantis",
	6: "Fun Forever Group",
	7: "FYP Teammates",
	8: "FYP Client",
	9: "FYP Supervisor",
	10: "IoTP Teammate",
	11: "IPS Teammates",
	12: "Bryan",
	13: "SEED (CH, HW, D, S, J)",
	14: "YT's Server",
	15: "Andrew's circle",
	16: "Shreya & Leng",
	17: "Brian",
	18: "Mr. Hee",
	19: "Company staffs",
	20: "Eva",
	21: "Lawii",
	22: "Iannis",
	23: "Chris",
	24: "Snowii",
	25: "Rene",
	26: "Hooter's Server",
	27: "Randoms",
	28: "",
}

export { DAYS, PEOPLE, INTERVALS, METHODS, GROUPS }