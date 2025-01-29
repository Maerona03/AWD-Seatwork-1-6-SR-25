// Function to calculate total marks and store data
function total() {
    let name = document.getElementById("studentName").value.trim();
    let sub1 = parseInt(document.getElementById("DesignThinking").value) || 0;
    let sub2 = parseInt(document.getElementById("Computer").value) || 0;
    let sub3 = parseInt(document.getElementById("Networking").value) || 0;
    let sub4 = parseInt(document.getElementById("AdvanceWeb").value) || 0;
    let sub5 = parseInt(document.getElementById("Database").value) || 0;

    if (!name) {
        alert("Please enter the student's name.");
        return;
    }

    if ([sub1, sub2, sub3, sub4, sub5].some(score => score > 100 || score < 0)) {
        alert("Invalid Input! Enter values between 0 and 100.");
        return;
    }

    let totalMarks = sub1 + sub2 + sub3 + sub4 + sub5;

    // Display results for total only
    document.getElementById("student-name-result").innerHTML = `Student: ${name}`;
    document.getElementById("total-result").innerHTML = `Total: ${totalMarks}`;

    // Save student data (without average and grade)
    saveStudentRecord({ name, sub1, sub2, sub3, sub4, sub5, totalMarks, averageMarks: null, grade: null });
}

// Function to calculate and display average
function average() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let lastStudent = students[students.length - 1]; // Get the latest entry

    if (!lastStudent) {
        alert("No data found! Please calculate total first.");
        return;
    }

    let averageMarks = (lastStudent.totalMarks / 5).toFixed(2);
    document.getElementById("average-result").innerHTML = `Average: ${averageMarks}`;

    // Update the stored data
    lastStudent.averageMarks = averageMarks;
    students[students.length - 1] = lastStudent;
    localStorage.setItem("students", JSON.stringify(students));
}

// Function to calculate and display grade
function grade() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let lastStudent = students[students.length - 1];

    if (!lastStudent || lastStudent.averageMarks === null) {
        alert("No data found! Please calculate average first.");
        return;
    }

    let grade = calculateGrade(parseFloat(lastStudent.averageMarks));

    document.getElementById("grade-result").innerHTML = `Grade: ${grade}`;

    // Update the stored data
    lastStudent.grade = grade;
    students[students.length - 1] = lastStudent;
    localStorage.setItem("students", JSON.stringify(students));
}

// Function to calculate grade based on average marks
function calculateGrade(avg) {
    if (avg >= 80) return "A";
    if (avg >= 70) return "B";
    if (avg >= 60) return "C";
    if (avg >= 50) return "D";
    return "F";
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
            <td>${student.totalMarks}</td>
            <td>${student.averageMarks || "N/A"}</td>
            <td>${student.grade || "N/A"}</td>
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
