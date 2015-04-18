function initGoalDetailPage() {
    loadGoalSetting();
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

//save the settings into local storage
function saveGoalSetting()
{
    var currentGoal = window.localStorage.getItem("currentEditGoal");
    if (currentGoal !== null) {
        var goalObj = loadOBJFromLocalStorage(currentGoal);
        goalObj.goalTitle = $("#goalTitle").val();
        goalObj.goalDscrpt = $("#goalDetail").val();
        goalObj.goalStartDate = $("#goalStartDate").val();
        goalObj.goalEndDate = $("#goalEndDate").val();
        goalObj.goalProgress = $("#goalProgress").val();
        goalObj.goalComplete = $("#goalProgress").val() + "% completed.";
        //save the goal settings.
        saveObjToLocalStorage(currentGoal, goalObj);
        //pop up setting ok message.
        var interval = setInterval(function () {
            $('#saveOkDialog').popup('open', { history: false });
            var intervalClose = setInterval(function () {
                $('#saveOkDialog').popup('close');
                clearInterval(intervalClose);
            }, 1000);
            clearInterval(interval);
        }, 1);
    }
}

//load the settings at local storage to UI
function loadGoalSetting()
{
    var currentGoal = window.localStorage.getItem("currentEditGoal");
    if (currentGoal !== null) {
        var goalObj = loadOBJFromLocalStorage(currentGoal);
        $("#goalTitle").val(goalObj.goalTitle);
        $("#goalDetail").val(goalObj.goalDscrpt);
        $("#goalStartDate").val(goalObj.goalStartDate);
        $("#goalEndDate").val(goalObj.goalEndDate );
        $("#goalProgress").val(goalObj.goalProgress );
    }
}