const fs = require('fs');
const os = require('os');

const logFile = "systemlog.txt";

function SystemInfo(){

    setInterval(() => {
        const time = new Date().toLocaleString();
        const cpuInfo = os.cpus()[0].model;
        const totalMemory = (os.totalmem()/(1024 ** 3)).toFixed(2);
        const freeMemory = (os.freemem()/(1024 ** 3)).toFixed(2);
        const platform = os.platform();
    
        const logData = `
         Time : ${time}
         platform : ${platform}
         cpuInfo : ${cpuInfo}
         Total memory : ${totalMemory}GB
         free Memory : ${freeMemory}GB
        `;
    
        fs.appendFileSync(logFile,logData)
    }, 5000);
}



module.exports ={
    SystemInfo
}