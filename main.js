let suft = document.querySelector('.suft');
let suft_open = document.querySelector('.suft-toggle .toggle-button');
let suft_close = document.querySelector('.content-close .close-button');

// OnLoad Run
window.addEventListener('load', function() {
    // Find document body element
    // Create all necessary elements in top of body
    // Setup listeners


    suft_open.addEventListener('click', function() {
        if (suft.classList.contains('suft-active')) {
            suft.classList.remove('suft-active');
        }
        else {
            suft.classList.add('suft-active');
        }
    });

    suft_close.addEventListener('click', function() {
        if (suft.classList.contains('suft-active')) {
            suft.classList.remove('suft-active');
        }
        else {
            suft.classList.add('suft-active');
        }
    });
});