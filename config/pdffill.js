var pdfFiller   = require('pdffiller');
 
function fill(form, destination){
var sourcePDF = "/public/template/SP_Masters.pdf";
var destinationPDF =  destination;
var lastname = form.lastname;
var firstname = form.firstname;

var data = {
    "Last Name" : lastname,
    "First Name" : firstname,
    'Student Identification No':form.schoolid,
    'Major': form.major,
    'Concentration': form.concentration,
    "Graduation Year": form.gradyear ,
    "Group1": "Choice1",
    "Group2": "Fall",
    "Group3": "Choice1",
    "Group4": "3",
    "YearRow1": form.courseList[0].year,
    "TermRow1": form.courseList[0].term,
    "Course NumberRow1": form.courseList[0].number,
    "Course NameRow1": form.courseList[0].name,
    "CreditsRow1": "3.0",

    "YearRow2": form.courseList[1].year,
    "TermRow2": form.courseList[1].term,
    "Course NumberRow2": form.courseList[1].number,
    "Course NameRow2": form.courseList[1].name,
    "CreditsRow2": "3.0",

    "YearRow3": form.courseList[2].year,
    "TermRow3": form.courseList[2].term,
    "Course NumberRow3": form.courseList[2].number,
    "Course NameRow3": form.courseList[2].name,
    "CreditsRow3": "3.0",

    "YearRow4": form.courseList[3].year,
    "TermRow4": form.courseList[3].term,
    "Course NumberRow4": form.courseList[3].number,
    "Course NameRow4": form.courseList[3].name,
    "CreditsRow4": "3.0",

    "YearRow5": form.courseList[4].year,
    "TermRow5": form.courseList[4].term,
    "Course NumberRow5": form.courseList[4].number,
    "Course NameRow5": form.courseList[4].name,
    "CreditsRow5": "3.0",

    "YearRow6": form.courseList[5].year,
    "TermRow6": form.courseList[5].term,
    "Course NumberRow6": form.courseList[5].number,
    "Course NameRow6": form.courseList[5].name,
    "CreditsRow6": "3.0",

    "YearRow7": form.courseList[6].year,
    "TermRow7": form.courseList[6].term,
    "Course NumberRow7": form.courseList[6].number,
    "Course NameRow7": form.courseList[6].name,
    "CreditsRow7": "3.0",

    "YearRow8": form.courseList[7].year,
    "TermRow8": form.courseList[7].term,
    "Course NumberRow8": form.courseList[7].number,
    "Course NameRow8": form.courseList[7].name,
    "CreditsRow8": "3.0",

    "YearRow9": form.courseList[8].year,
    "TermRow9": form.courseList[8].term,
    "Course NumberRow9": form.courseList[8].number,
    "Course NameRow9": form.courseList[8].name,
    "CreditsRow9": "3.0",

    "YearRow10": form.courseList[9].year,
    "TermRow10": form.courseList[9].term,
    "Course NumberRow10": form.courseList[9].number,
    "Course NameRow10": form.courseList[9].name,
    "CreditsRow10": "3.0"
    };

pdfFiller.fillForm( sourcePDF, destinationPDF, data, function(err) {
    if (err) throw err;
    console.log("In callback (we're done).");
});

}
exports.fill = fill;