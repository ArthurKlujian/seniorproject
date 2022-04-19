'use strict';
const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    age: 47,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven']
};
const message = prompt("What would you like to know about Mr. Schmedtmann? Select firstName, lastName, age, job, or friends");
document.write(jonas[message]);