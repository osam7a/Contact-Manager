$("body").ready(function() {
    $("#sidebarToggle").on('click', function(e) {
        e.preventDefault();
        $("#sidebar").toggleClass("hidden");
        $("#sidebarToggle>svg").css("transform", $("#sidebar").hasClass("hidden") ? "scaleX(-1)" : "scaleX(1)");
    });
});