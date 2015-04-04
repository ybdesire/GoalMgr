$("document").ready(function () {
    //init home page
    (function () {
        if(window.localStorage.getItem("goalCount")===null)//no goals
        {
            window.localStorage.setItem("goalCount", "0");
        }
        else if (parseInt(window.localStorage.getItem("goalCount"))>0)
        {
            loadGoalsFromLocalStorage();
        }
    })();

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
            var liId = "goal" + goalSeq;
            var goalTitle = "goal" + goalSeq;
            var goalTitleId = "goal" + goalSeq + "Title";
            var goalCompleteId = "goal" + goalSeq + "Complete";
            var goalComplete0 = "0% completed";

            var listHtml = "<li id='" + liId + "'>" +
                                "<a href='#'>" +
                                    "<h2 id='" + goalTitleId + "'>" + goalTitle + "</h2>" +
                                    "<p id='" + goalCompleteId + "'>" + goalComplete0 + "</p>" +
                                "</a>" +
                            "</li>";

            $("#goalsList").append(listHtml);
            //increase goal count
            var newGoalSeq = parseInt(goalSeq) + 1;
            localStorage.setItem("goalCount", String(newGoalSeq));

            $('ul').listview('refresh');

        });

    }

    function removeFooter()
    {
        $("#footerDiv").remove();
    }


    function loadGoalsFromLocalStorage()
    {

    }
});
