const fs = require('fs');

function ReadLog(){
    const data = fs.readFileSync('log.txt','utf-8');
    const count = data.split(" ");
    fs.writeFileSync('wordcount.txt',`word Count: ${count.length}`);
}

module.exports = {
    ReadLog
}