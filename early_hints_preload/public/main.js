function run() {
    document.getElementById('app').innerHTML = "It's an app from main.js";
    
};
console.log(`main js run at ${new Date().getTime()}`)
if(document.getElementById('app')) {
    run();
} else {
    window.addEventListener('load', run);
}