function tipcalculator(bill){
    var percent = (bill>=50 && bill<=300) ? 0.15 : 0.20;
    var tip = bill * percent;
    var refined = percent * 100;
    var total = bill+tip;
    var result = "The final bill is " + bill + " dollars and therefore will tip " + refined + "%, he will pay a total of " + total + " dollars.";
    return result;
}

const input = prompt("Thank you Clark judges for your time!");
const num = parseInt(input);
console.log(tipcalculator(num));
