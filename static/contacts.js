var selected = [];

$("#select-all-current").on("change", function() {
    selected = [];
    $("[id^=select-one-]").prop("checked", $(this).prop("checked"));
    // add the numbers after select-one- to the selected array
    if ($(this).prop("checked")) {
        $("[id^=select-one-]").each(function() {
            selected.push($(this).attr("id").split("-")[2]);
        });
    } else {
        selected = [];
    }
    
    var currentText = $('#selectionCount').text().split(' ').slice(1, 5).join(' ');
    $('#selectionCount').html(selected.length + ' ' + currentText + ' <a href="#" id="select-all" class="text-blue-500">Select All</a>');
});

$("[id^=select-one-]").on("change", function() {
    if ($(this).prop("checked")) {
        selected.push($(this).attr("id").split("-")[2]);
    } else {
        for (var i = 0; i < selected.length; i++) {
            if (selected[i] == $(this).attr("id").split("-")[2]) {
                selected.splice(i, 1);
            }
        }
    }
    // if all checkboxes are checked, check the select-all checkbox
    if ($("[id^=select-one-]").length == $("[id^=select-one-]:checked").length) {
        $("#select-all-current").prop("checked", true);
    } else {
        $("#select-all-current").prop("checked", false);
    }

    var currentText = $('#selectionCount').text().split(' ').slice(1, 5).join(' ');
    $('#selectionCount').html(selected.length + ' ' + currentText + ' <a href="#" id="select-all" class="text-blue-500">Select All</a>');
});