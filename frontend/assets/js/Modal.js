//button for close modal
$('.btn_control.warn').click(function () {
    let modal = document.getElementsByClassName("modal-overlay")[0];
    modal.classList.add("d-none");
});

//button for open modal
$('.btn_insert').click(function () {
    
    let modal = document.getElementsByClassName("modal-overlay")[0];
    modal.classList.remove("d-none");
});