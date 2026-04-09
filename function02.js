function UseSetTimeout() {
    setTimeout(() =>{
        console.log("this message will log using settimeout after 3 seconds")
    }, 3000);
}

function UseSetInterval() {
    setInterval(() =>{
        console.log("this message will log using setInterval after every 5 seconds")
    },5000);
}

function useSetImmediate(){
    setImmediate(() =>{
        console.log('8:this is message after setImmediate.');
    });
}

module.exports = {
    UseSetTimeout,
    UseSetInterval,
    useSetImmediate
}