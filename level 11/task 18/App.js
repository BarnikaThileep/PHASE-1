const students = [
    { name: "Barnika", age: 20, grades: [85, 90, 88] },
    { name: "AbidhaShree", age: 19, grades: [78, 74, 80] },
    { name: "Santhiya", age: 22, grades: [92, 88, 95] },
    { name: "Malavika", age: 20, grades: [70, 65, 68] },
    { name: "Vijay", age: 21, grades: [88, 90, 85] }
];
const studentNames = students.map(student => student.name);
console.log("Student Names:", studentNames);
const studentsOlderThan20 = students.filter(student => student.age > 20);
console.log("Students Older Than 20:", studentsOlderThan20);
const totalGrades = students.reduce((sum, student) => sum + student.grades.reduce((a, b) => a + b, 0) / student.grades.length, 0);
const averageGradeAll = totalGrades / students.length;
console.log("Average Grade of All Students:", averageGradeAll.toFixed(2));
const avgGradeOlderThan20 = students
    .filter(student => student.age > 20)
    .map(student => student.grades.reduce((a, b) => a + b, 0) / student.grades.length)
    .reduce((sum, grade, _, array) => sum + grade / array.length, 0);

console.log("Average Grade of Students Older Than 20:", avgGradeOlderThan20.toFixed(2));
