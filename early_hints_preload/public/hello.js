function run() {
    document.getElementById('hello').innerHTML = "It's a message from hello.js";
};

if(document.getElementById('hello')) {
    run();
} else {
    window.addEventListener('load', run);
}