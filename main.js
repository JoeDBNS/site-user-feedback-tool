let suft_user_details = {};
let suft_status = {
    'active': false,
    'target_type': '',
    'target_element': '',
    'target_draw_start_x': '',
    'target_draw_start_y': '',
    'target_draw_end_x': '',
    'target_draw_end_y': ''
};
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
        SuftOpen();
    });

    suft_close.addEventListener('click', function() {
        SuftClose();
    });

    document.addEventListener('mousemove', function(event) {
        if (suft_status.target_type === 'draw') {
            if (suft_status.target_draw_start_x !== '' && suft_status.target_draw_end_x === '') {
                SuftDrawSelected(suft_status.target_draw_start_y, suft_status.target_draw_start_x, event.pageY - suft_status.target_draw_start_y , event.pageX - suft_status.target_draw_start_x);
            }
        }
    });

    document.addEventListener('mousedown', function(event) {
        if (suft_status.target_type === 'element') {
            if (!IsElementInsideSuft(event.target)) {
                suft_status.target_element = SuftBuildTargetElementPath(event.path);
                SuftDrawSelected(event.target.offsetTop, event.target.offsetLeft, event.target.scrollHeight, event.target.scrollWidth);
            }
        }
        if (suft_status.target_type === 'draw') {
            if (event.button === 0) {
                if (!IsElementInsideSuft(event.target)) {
                    SuftResetDraw();
                    suft_status.target_draw_end_x = '';
                    suft_status.target_draw_end_y = '';

                    suft_status.target_draw_start_x = event.pageX;
                    suft_status.target_draw_start_y = event.pageY;
                }
            }
        }
    });

    document.addEventListener('mouseup', function(event) {
        if (suft_status.target_type === 'draw') {
            if (event.button === 0) {
                suft_status.target_draw_end_x = event.pageX;
                suft_status.target_draw_end_y = event.pageY;
            }
        }
    });

    Array.from(document.querySelectorAll('[name="suft-info-target-type"]')).forEach(function(radio) {
        radio.addEventListener('change', function() {
            suft_status.target_type = radio.value;
            SuftResetDrawData();
            SuftResetDraw();
        });
    });
});

function GiveAllElementsSuftId() {
    var id_inter = 0;

    Array.from(document.querySelectorAll('*')).forEach(function(element) {
        element.setAttribute('data-suft-target-id', id_inter);
        id_inter = id_inter + 1;
    });
}

function SuftOpen() {
    SuftResetForm();
    suft.classList.add('suft-active');
    SuftCaptureBrowserDetails();
    GiveAllElementsSuftId();
    suft_status.active = true;
}

function SuftClose() {
    suft.classList.remove('suft-active');
    SuftResetForm();
    suft_status.active = false;
}

function SuftCaptureBrowserDetails() {
    if (navigator.userAgent.includes('Firefox/')) {
        suft_user_details.browser_name = 'firefox';
        suft_user_details.browser_version = navigator.userAgent.split('Firefox/')[1];
    }
    else if (navigator.userAgent.includes('Edg/')) {
        suft_user_details.browser_name = 'edge';
        suft_user_details.browser_version = navigator.userAgent.split('Edg/')[1];
    }
    else if (navigator.userAgent.includes('Chrome/')) {
        suft_user_details.browser_name = 'chrome';
        suft_user_details.browser_version = navigator.userAgent.split('Chrome/')[1].split(' ')[0];
    }
    else if (navigator.userAgent.includes('Safari/')) {
        suft_user_details.browser_name = 'safari';
        suft_user_details.browser_version = navigator.userAgent.split('Safari/')[1];
    }

    suft_user_details.device_platform = navigator.platform;

    suft_user_details.viewport_width = document.documentElement.clientWidth;
    suft_user_details.viewport_height = document.documentElement.clientHeight;
}

function IsElementInsideSuft(element) {
    suft_contains_element = false;

    while (element !== null) {
        if (element === suft) {
            suft_contains_element = true;
        }
        element = element.parentElement;
    }

    return suft_contains_element;
}

function SuftBuildTargetElementPath(path) {
    var path_depth = 0;
    var path_as_string = '';

    path.forEach(function(node) {
        if (node.outerHTML) {
            if (path_depth === 0) {
                path_as_string = node.outerHTML;
            }
            else {
                path_as_string = node.outerHTML.split('>')[0] + '>\n' + path_as_string;
            }

            path_depth = path_depth + 1;
        }
    });

    return path_as_string;
}

function SuftResetForm() {
    var target_type_checked = document.querySelector('[name="suft-info-target-type"]:checked');
    if (target_type_checked) {
        target_type_checked.checked = false;
    }

    document.querySelector('#suft-info-comment').value = '';
    document.querySelector('#suft-info-priority').value = 'low';


    SuftResetDrawData();
    SuftResetDraw();
    suft_status.target_type = '';
}

function SuftResetDrawData() {
    suft_status.target_element = '';
    suft_status.target_draw_start_x = '';
    suft_status.target_draw_start_y = '';
    suft_status.target_draw_end_x = '';
    suft_status.target_draw_end_y = '';
}

function SuftResetDraw() {
    suft_selected.classList.remove('suft-selected-active');
    suft_selected.style.top = '0px';
    suft_selected.style.left = '0px';
    suft_selected.style.height = '0px';
    suft_selected.style.width = '0px';
}

function SuftDrawSelected(top, left, height, wieght) {
    suft_selected.classList.add('suft-selected-active');
    suft_selected.style.top = (top - 3) + 'px';
    suft_selected.style.left = (left - 3) + 'px';
    suft_selected.style.height = height + 'px';
    suft_selected.style.width = (wieght + 3) + 'px';
}