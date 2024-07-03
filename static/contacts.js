var selected = [];
var allSelected = false;

$("#select-all-current").on("change", function() {
    selected = [];
    $("[id^=select-one-]").prop("checked", $(this).prop("checked"));
    // add the numbers after select-one- to the selected array
    if ($(this).prop("checked")) {
        $("[id^=select-one-]").each(function() {
            selected.push($(this).parents("tr").attr("id").split("-")[1]);
        });
    } else {
        selected = [];
    }
    
    var currentText = $('#selectionCount').text().split(' ').slice(1, 5).join(' ');
    $('#selectionCount').html(selected.length + ' ' + currentText + ' <a href="#" id="select-all" class="text-blue-500">Select All</a>');
});

$("[id^=select-one-]").on("change", function() {
    if ($(this).prop("checked")) {
        // get the parent id and add it to the selected array
        selected.push($(this).parents("tr").attr("id").split("-")[1])
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

$("#select-all").on("click", function() {
    allSelected = !allSelected;
    
    selected = [];
    if (allSelected) {
        $("[id^=select-one-]").prop("checked", true);
    } else {
        $("[id^=select-one-]").prop("checked", false);
    }

    var currentText = $('#selectionCount').text().split(' ').slice(1, 5).join(' ');
    var totalContacts = $('#selectionCount').text().split(' ').slice(5, 6).join(' ');
    $('#selectionCount').html(allSelected ? totalContacts : selected.length + ' ' + currentText + ` <a href="#" id="select-all" class="text-blue-500">${allSelected ? 'Unselect' : 'Select'} All</a>`);
});