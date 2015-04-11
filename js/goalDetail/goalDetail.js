function initGoalDetailPage() {
    disablePageEdit();
}

function enablePageEdit() {
    $("#goalTitle, #goalDetail, #goalStartDate, #goalEndDate").removeAttr("readonly");
    $("#goalProgress").slider("enable");
}

function disablePageEdit() {
    $("#goalTitle, #goalDetail, #goalStartDate, #goalEndDate").attr("readonly", true);
    $("#goalProgress").slider("disable");
}

function editBtnEvent() {
    if ($("#editBtn").html() === "Edit") {
        $("#editBtn").html("Done");
        enablePageEdit();
    }
    else {
        $("#editBtn").html("Edit");
        disablePageEdit();
    }
}