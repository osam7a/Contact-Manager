var pendingChanges = [];

$("#pageInput").on("change", function() {
    pendingChanges.forEach(function(change) {
        clearTimeout(change);
    });

    var minPage = 1;
    var lastPage = parseInt($("#pagesInfo").text().split(" ")[1]);
    
    // if the input is not a number, set it to the minimum page
    if (isNaN(parseInt($(this).val()))) {
        $(this).val(minPage);
    }

    if (parseInt($(this).val()) < minPage) {
        $(this).val(minPage);
    } else if (parseInt($(this).val()) > lastPage) {
        $(this).val(lastPage);
    }

    var pageChange = setTimeout(function() {
        var page = parseInt($("#pageInput").val());
        window.location.href = "/contacts?p=" + page;
    }, 1000);
    pendingChanges.push(pageChange);
});

$("#nextPage").on("click", function() {
    var page = parseInt($("#pageInput").val());
    var lastPage = parseInt($("#pagesInfo").text().split(" ")[1]);
    if (page < lastPage) {
        window.location.href = "/contacts?p=" + (page + 1);
    }
});

$("#previousPage").on("click", function() {
    var page = parseInt($("#pageInput").val());
    if (page > 1) {
        window.location.href = "/contacts?p=" + (page - 1);
    }
});