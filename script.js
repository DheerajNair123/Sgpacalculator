function calculateRequiredMarks() {
    var desiredSGPA = parseFloat(document.getElementById("desiredsgpa").value);

    if (isNaN(desiredSGPA) || desiredSGPA <= 0 || desiredSGPA > 10) {
        document.getElementById("result").innerHTML = "Please enter a valid desired SGPA (between 0 and 10).";
        return;
    }

    var subjectInputs = document.querySelectorAll("#subjectInputs input");
    var totalSemExamRequiredMarks = 0;
    var resultsHTML = "<h2>Results:</h2>";

    subjectInputs.forEach(function(input, index) {
        var caMarks = parseFloat(input.value);

        if (isNaN(caMarks) || caMarks < 0 || caMarks > 40) {
            document.getElementById("result").innerHTML = "Please enter valid CA marks (0-40) for all subjects.";
            return;
        }

        var currentSGPA = calculateCurrentSGPA(caMarks);
        var semExamRequiredMarks = Math.max(((desiredSGPA * 10) - currentSGPA * 10) * (60 / 10), 24);

        if (semExamRequiredMarks > 60) {
            resultsHTML += "<p>Subject " + (index + 1) + ": You need above 60 in end exam which is not possible. Expect less than " + desiredSGPA.toFixed(2) + " SGPA.</p>";
        } else {
            resultsHTML += "<p>Subject " + (index + 1) + ": You need to score at least " + semExamRequiredMarks.toFixed(2) + " marks in the semester exam.</p>";
        }

        totalSemExamRequiredMarks += semExamRequiredMarks;
    });
    
    resultsHTML += "<p><strong>Total required marks across all subjects: " + totalSemExamRequiredMarks.toFixed(2) + "</strong></p>";
    document.getElementById("result").innerHTML = resultsHTML;
}

function calculateCurrentSGPA(camarks) {
    // Assuming a linear relationship between CA marks and SGPA.
    return (camarks / 40) * 10;
}

function generateSubjectInputs() {
    var numSubjects = parseInt(document.getElementById("numSubjects").value);

    if (isNaN(numSubjects) || numSubjects <= 0 || numSubjects>=6) {
        alert("Please enter a valid number of subjects(1-5).");
        return;
    }

    var subjectInputsDiv = document.getElementById("subjectInputs");
    subjectInputsDiv.innerHTML = ""; // Clear previous inputs

    for (var i = 1; i <= numSubjects; i++) {
        var label = document.createElement("label");
        label.textContent = "Enter CA Marks for Subject " + i + " (out of 40):";
        subjectInputsDiv.appendChild(label);

        var input = document.createElement("input");
        input.type = "number";
        input.id = "caMarks_" + i;
        input.classList.add("no-stepper", "subject-input");
        input.placeholder = "Enter CA Marks";
        subjectInputsDiv.appendChild(input);

        subjectInputsDiv.appendChild(document.createElement("br"));
    }
}
