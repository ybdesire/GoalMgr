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

//convert object to string and store the obj into local storage
function saveObjToLocalStorage(key, obj) {
    window.localStorage.setItem(key, JSON.stringify(obj));
}
//convert string to object, since local storage are string-only
function loadOBJFromLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

function removeGoal(){
    var currentGoal = window.localStorage.getItem("currentEditGoal");
    if (currentGoal !== null) {
        //reset goalArray to show that the goal have been deleted
        var goalArray = loadOBJFromLocalStorage("goalArray");
        goalArray[currentGoal]=false;
        saveObjToLocalStorage("goalArray", goalArray);
        //remove all goal related info at local storage
        window.localStorage.removeItem(currentGoal);
    }
    else {
        console.log("ERROR:cannot load 'currentEditGoal' from local storage.");
    }

}