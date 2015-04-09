$("document").ready(function () {
    //init home page
    function homeInit() {
        if (window.localStorage.getItem("goalCount") === null)//no goals
        {
            window.localStorage.setItem("goalCount", "0");
        }
        else if (parseInt(window.localStorage.getItem("goalCount")) > 0) {
            loadGoalsFromLocalStorage();
        }
    };

    $("#editBtn").click(function () {
        if ($("#editBtn").html() === "Edit")
        {
            $("#editBtn").html("Done");
            addFooter();
        }
        else
        {
            $("#editBtn").html("Edit");
            removeFooter();
        }
        
    });

    //event handle for list view click
    $("#goalsList").delegate("li", "click", function () {
        console.log($(this).attr("id"));
        //load goal setting page
        window.location = "goalDetail.html";
        $("#goalHeader").value = $(this).attr("id");
        //load info

    });

    function addFooter()
    {
        $("#homePageFooter").append("<div id='footerDiv'></div>");//Add div to hold navbar
        //add navbar to footer
        $("#footerDiv").append(" \
                        <div data-role='navbar'>    \
                            <ul>                    \
                                <li><a href='#' data-icon='minus' id='rmGoal'></a></li>            \
                                <li><a href='#' data-icon='plus' id='addGoal'></a></li>             \
                            </ul>                                                                   \
                        </div>");
        $("div[data-role='navbar']").navbar();

        //add footer navbar click function
        $("#addGoal").click(function () {
            var goalSeq = localStorage.getItem("goalCount");

            var goalObj = {
                goalId: "goal" + goalSeq,
                goalTitle:"goal" + goalSeq,
                goalTitleId:"goal" + goalSeq + "Title",
                goalCompleteId:"goal" + goalSeq + "Complete",
                goalComplete: "0% completed"
            };

            var listHtml = "<li id='" + goalObj.goalId + "'>" +
                                "<a href='#'>" +
                                    "<h2 id='" + goalObj.goalTitleId + "'>" + goalObj.goalTitle + "</h2>" +
                                    "<p id='" + goalObj.goalCompleteId + "'>" + goalObj.goalComplete + "</p>" +
                                "</a>" +
                            "</li>";

            $("#goalsList").append(listHtml);
            //increase goal count
            var newGoalSeq = parseInt(goalSeq) + 1;
            localStorage.setItem("goalCount", String(newGoalSeq));
            //update goal array
            goalArrayMgr(goalObj.goalId, true);
            //save goal property into local storage
            saveObjToLocalStorage(goalObj.goalId, goalObj);
            //update goal list
            $('ul').listview('refresh');
        });
    }

    //manage goal status by goalArray object
    //e.g. goalArray = {"goal1":true,"goal2":false,"goal3":true,"goal4":true};
    //which means goal2 have been deleted. But goal1, goal3, goal3 are exists at local storage.
    function goalArrayMgr(goalId, exist)
    {
        if (window.localStorage.getItem("goalArray") === null)//no goals
        {
            var goalArray = {};
        }
        else
        {
            var goalArray = loadOBJFromLocalStorage("goalArray");
        }
        goalArray[goalId] = exist;
        saveObjToLocalStorage("goalArray", goalArray);
    }

    function removeFooter()
    {
        $("#footerDiv").remove();
    }

    //convert object to string and store the obj into local storage
    function saveObjToLocalStorage(key, obj)
    {
        window.localStorage.setItem(key, JSON.stringify(obj));
    }
    //convert string to object, since local storage are string-only
    function loadOBJFromLocalStorage(key)
    {
        return JSON.parse(window.localStorage.getItem(key));
    }

    //load all goals from local storage and display them at home page, when page init
    function loadGoalsFromLocalStorage()
    {
        var goalArray = loadOBJFromLocalStorage("goalArray");
        if(goalArray!==null)
        {
            for (var goal in goalArray)//goalArray is the goal exist status object
            {
                if (goalArray[goal] === true)//if the goal still exist
                {
                    var goalObj = loadOBJFromLocalStorage(goal);
                    var listHtml = "<li id='" + goalObj.goalId + "'>" +
                        "<a href='#'>" +
                            "<h2 id='" + goalObj.goalTitleId + "'>" + goalObj.goalTitle + "</h2>" +
                            "<p id='" + goalObj.goalCompleteId + "'>" + goalObj.goalComplete + "</p>" +
                        "</a>" +
                    "</li>";
                    $("#goalsList").append(listHtml);
                }
            }
            //update goal list
            $('ul').listview('refresh');
        }
    }
});
