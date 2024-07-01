var selected = [];

$("#select-all").on("change", function() {
    $("[id^=select-one-]").prop("checked", $(this).prop("checked"));
    // add the numbers after select-one- to the selected array
    if ($(this).prop("checked")) {
        $("[id^=select-one-]").each(function() {
            selected.push($(this).attr("id").split("-")[2]);
        });
    } else {
        selected = [];
    }
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
        $("#select-all").prop("checked", true);
    } else {
        $("#select-all").prop("checked", false);
    }
});