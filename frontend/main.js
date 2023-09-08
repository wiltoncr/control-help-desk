import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';
import './assets/js/Modal';

$('.toggle').click(function () {
    // Switches the Icon
    $(this).children('i').toggleClass('fa-pencil');
    // Switches the forms  
    $('.form').animate({
        height: "toggle",
        'padding-top': 'toggle',
        'padding-bottom': 'toggle',
        opacity: "toggle"
    }, "slow");
});

const btn_save = document.querySelector('.btn_control.success');
btn_save.addEventListener('click', fCheckSendForm);

function fCheckSendForm() {
    const inputsModal = document.querySelectorAll('.modal-body input, select');
    let formData = {};
    inputsModal.forEach(function (input) {
        formData[input.name] = input.value;
    });

    $.ajax({
        'url': window.location.href + '/create' + getPage(),
        'type': 'POST',
        'data': formData,
        'success': function (data) {
            console.log(JSON.stringify(data));
            $('.btn_control.warn').click();
        },
        'error': function (request, error) {
            console.log(JSON.stringify(request));
        }
    });

};

