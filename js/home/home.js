$("document").ready(function () {
    $("#editBtn").click(function () {
        addFooter();
    });



    function addFooter()
    {
        //$("#homePageFooter").attr("data-role", "footer");
        $("#homePageFooter").append("<h1>asdf</h1>");
    }
});
