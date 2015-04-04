$("document").ready(function () {
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

    }

    function removeFooter()
    {
        $("#footerDiv").remove();
    }

    $("#addGoal").click(function () {

    });
});
