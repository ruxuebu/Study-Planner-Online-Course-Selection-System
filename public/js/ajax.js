(function ($) {

    var newCoreCourseForm = $("#coreCourseForm"),
        newCoreCourse = $("#coreCourse"),
        newCoreCourseYear =$("#coreCourseYear"),
        newCoreCourseTerm = $("#coreCourseTerm");

    newCoreCourseForm.submit(function (event) {
        event.preventDefault();

        var newCC = newCoreCourse.val();
        var newCCYear = newCoreCourseYear.val();
        var newCCTerm = newCoreCourseTerm.val();
        var courseList = $("#courseList");

        if (newCoreCourse) {
            var requestConfig = {
                method: "POST",
                url: "/form2",
                contentType: 'application/json',
                data: JSON.stringify({
                    name: newCC,
                    year: newCCYear,
                    term: newCCTerm
                })
            };

            $.ajax(requestConfig).then(function (res) {
                console.log(res);
                courseList.html(res.message);
            });
        }
    });
})(window.jQuery);