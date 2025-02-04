// Function to calculate GWA and display results
function calculate() {
    let name = document.getElementById("studentName").value.trim();

    // Get grades
    let sub1 = parseInt(document.getElementById("DesignThinking").value) || 0;
    let sub2 = parseInt(document.getElementById("Computer").value) || 0;
    let sub3 = parseInt(document.getElementById("Networking").value) || 0;
    let sub4 = parseInt(document.getElementById("AdvanceWeb").value) || 0;
    let sub5 = parseInt(document.getElementById("Database").value) || 0;

    // Get units
    let units1 = parseInt(document.getElementById("DesignThinkingUnits").value) || 0;
    let units2 = parseInt(document.getElementById("ComputerUnits").value) || 0;
    let units3 = parseInt(document.getElementById("NetworkingUnits").value) || 0;
    let units4 = parseInt(document.getElementById("AdvanceWebUnits").value) || 0;
    let units5 = parseInt(document.getElementById("DatabaseUnits").value) || 0;

    if (!name) {
        alert("Please enter the student's name.");
        return;
    }

    if ([sub1, sub2, sub3, sub4, sub5].some(score => score > 100 || score < 0) ||
        [units1, units2, units3, units4, units5].some(unit => unit < 1 || unit > 5)) {
        alert("Invalid Input! Enter values between 0 and 100 for grades, and 1 to 5 for units.");
        return;
    }

    // Calculate total weighted score
    let totalUnits = units1 + units2 + units3 + units4 + units5;
    let weightedTotal = (sub1 * units1) + (sub2 * units2) + (sub3 * units3) + (sub4 * units4) + (sub5 * units5);

    // Calculate GWA (General Weighted Average)
    let gwa = (weightedTotal / totalUnits).toFixed(2);

    // Display results
    document.getElementById("student-name-result").innerHTML = `Student: ${name}`;
    document.getElementById("gwa-result").innerHTML = `GWA: ${gwa}`;

    // Save student data
    saveStudentRecord({ name, gwa });
}

// Function to save student record to localStorage
function saveStudentRecord(student) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudentRecords();
}

// Function to display all student records in a table
function displayStudentRecords() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let tableBody = document.getElementById("student-records");
    tableBody.innerHTML = ""; // Clear existing table content

    students.forEach((student, index) => {
        let row = `<tr>
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.gwa || "N/A"}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Function to clear all records
function clearRecords() {
    localStorage.removeItem("students");
    displayStudentRecords();
}

// Load stored records when the page loads
window.onload = displayStudentRecords;
