var selected = [];
var allSelected = false;

$("#select-all-current").on("change", function() {
    allSelected = false;
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
    $('#selectionCount').html(selected.length + ' ' + currentText + ' <a href="javascript:void(0);" id="select-all" class="text-blue-500">Select All</a>');
});

$("[id^=select-one-]").on("change", function() {
    allSelected = false;
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
    $('#selectionCount').html(selected.length + ' ' + currentText + ' <a href="javascript:void(0);" id="select-all" class="text-blue-500">Select All</a>');
});

$(document).on("click", "#select-all", function() {
    allSelected = !allSelected;
    selected = [];
     
    if (allSelected) {
        $("#select-all-current").prop("checked", true)
        $("[id^=select-one-]").prop("checked", true);
    } else {
        $("#select-all-current").prop("checked", false)
        $("[id^=select-one-]").prop("checked", false);
    }

    var currentText = $('#selectionCount').text().split(' ').slice(1, 5).join(' ');
    var totalContacts = currentText.split(' ')[2];
    $('#selectionCount').html((allSelected ? totalContacts : selected.length) + ' ' + currentText + ` <a href="javascript:void(0);" id="select-all" class="text-blue-500">${allSelected ? 'Unselect' : 'Select'} All</a>`);
});

$("#applyActions").on("click", function() {
    // send POST request to /contacts/action
    var action = $("#action").val();

    if (action == "") {
        return;
    }

    if (selected.length == 0 && !allSelected || $("[id^=select-one-]:checked").length == 0) {
        return;
    }

    console.log(selected);

    $.ajax({
        url: "/contacts/action",
        type: "POST",
        data: {
            action: action,
            'target[]': allSelected ? "all" : selected,
            csrfmiddlewaretoken: $("#csrf").text()
        },
        success: function(data) {
            alert(data);
            location.reload();
        }
    });
});

document.body.onload = () => {
    // check if paramater ?spot= is in the url
    const urlParams = new URLSearchParams(window.location.search);
    const spot = urlParams.get('spot');
    const error = urlParams.get('error');
    const message = urlParams.get('message');

    if (spot) {
        // scroll to the spot
        $('#contactsContainer').animate({
            scrollTop: $("#" + spot).offset().top
        }, 1000);
        $("#" + spot).toggleClass('bg-yellow-200');
    }
    if (error == '1') {
        $("#alertBox").toggleClass("hidden").toggleClass("bg-red-200 border-red-500");
        $("#alertTitle").text("Error");
        $("#alertMessage").text(message || "An error occurred while processing your request. Please try again later.");
        $("#mainContainer").css({"grid-template-rows": "auto auto auto auto 1fr"})
    } else if (error == '0') {
        $("#alertBox").toggleClass("hidden").toggleClass("bg-green-200 border-green-500");
        $("#alertTitle").text("Success");
        $("#alertMessage").text(message || "Your request has been processed successfully.");
        $("#mainContainer").css({"grid-template-rows": "auto auto auto auto 1fr"})
    }
};