let suft = document.querySelector('.suft');
let suft_open = document.querySelector('.suft-toggle .toggle-button');
let suft_close = document.querySelector('.content-close .close-button');
let suft_selected = document.querySelector('.suft-selected');

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

function SuftResetSelected() {
    suft_selected.classList.remove('suft-selected-active');
    suft_selected.style.top = '0px';
    suft_selected.style.left = '0px';
    suft_selected.style.height = '0px';
    suft_selected.style.width = '0px';
}

function SuftSetSelected(element) {
    suft_selected.classList.add('suft-selected-active');
    suft_selected.style.top = (element.offsetTop - 3) + 'px';
    suft_selected.style.left = (element.offsetLeft - 3) + 'px';
    suft_selected.style.height = element.scrollHeight + 'px';
    suft_selected.style.width = (element.scrollWidth + 3) + 'px';
}



// for testing only
Array.from(document.querySelectorAll('.test-block')).forEach(function(element) {
    element.addEventListener('click', function() {
        SuftSetSelected(this);
    })
});