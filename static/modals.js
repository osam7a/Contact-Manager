$(document).ready(function() {
    $("[data-toggle='modal']").on("click", function() {
        var target = $(this).data("target");
        $(target).fadeIn(200);
    });
    
    $(".modal .modal-close").on("click", function() {
        $(this).parents(".modal").fadeOut(200);
    });
});