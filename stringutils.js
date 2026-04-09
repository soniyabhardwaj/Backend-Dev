function CapitaliseString(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function ReverseString(str){
    return str.split('').reverse().join('');
}

function CountoFVowels(str){
    const vowels = "aeiouAEIOU";
    let count = 0;
    for(let char of str){
        if(vowels.includes(char)){
            count++;
        }
    }
    return count;
}

module.exports = {
    CapitaliseString,
    ReverseString,
    CountoFVowels
}