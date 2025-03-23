// Your code here

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}


function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}


function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: Number(hour),
        date
    });
    return employee;
}


function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(hour),
        date
    });
    return employee;
}


function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}


function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
}


function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => total + allWagesFor(employee), 0);
}





const employeeData = [
    ["Gray", "Worm", "Security", 1],
    ["Missandei", "of Naath", "Assistant", 10]
];
const employees = createEmployeeRecords(employeeData);


createTimeInEvent(employees[0], "2025-03-23 0900");
createTimeOutEvent(employees[0], "2025-03-23 1700");
createTimeInEvent(employees[1], "2025-03-23 0800");
createTimeOutEvent(employees[1], "2025-03-23 1600");

console.log(hoursWorkedOnDate(employees[0], "2025-03-23")); 
console.log(wagesEarnedOnDate(employees[0], "2025-03-23")); 
console.log(allWagesFor(employees[0])); 
console.log(calculatePayroll(employees)); 