let day = 6; 
let dayName;
switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        console.log("It's the weekend!");
        break;
    case 7:
        dayName = "Sunday";
        console.log("It's the weekend!");
        break;
    default:
        dayName = "Invalid day number! Please enter a number between 1 and 7.";
}
console.log("Day:", dayName);
