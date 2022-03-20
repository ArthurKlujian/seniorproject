function wordlabs(myNoun, myAdjective, myVerb, myPlace){
    var result = "";
    result+= "The " + myAdjective + " " + myNoun + " " + myVerb + " to the " + myPlace + ".";
    return result;
}
console.log(wordlabs("dog", "cute", "ran", "park"));