// Kurse aus dem lokalen Speicher laden
let courses = JSON.parse(localStorage.getItem("courses")) || [];

// Einen Kurs hinzufügen
function addCourse() {
  const name = document.getElementById("name").value;
  const credits = Number(document.getElementById("credits").value);
  const grade = Number(document.getElementById("grade").value);

  if (name === "" || credits === 0 || grade === 0) {
    alert("Fülle alle Felder aus");
    return;
  }

  const course = {
    name: name,
    credits: credits,
    grade: grade
  };

  courses.push(course);

  // Speichern
  localStorage.setItem("courses", JSON.stringify(courses));

  // Neu anzeigen
  displayCourses();

  // Felder leeren
  document.getElementById("name").value = "";
  document.getElementById("credits").value = "";
  document.getElementById("grade").value = "";
}

// Kurse anzeigen
function displayCourses() {
  const list = document.getElementById("courseList");
  list.innerHTML = "";

  courses.forEach(course => {
    const li = document.createElement("li");
    li.textContent = `${course.name} – ${course.credits} LP – Note: ${course.grade}`;
    list.appendChild(li);
  });

  document.getElementById("average").textContent =
    "Durchschnitt: " + calculateAverage();
}

// Gewichteten Durchschnitt berechnen
function calculateAverage() {
  if (courses.length === 0) {
    return "-";
  }

  let sum = 0;
  let totalCredits = 0;

  courses.forEach(course => {
    sum += course.grade * course.credits;
    totalCredits += course.credits;
  });

  return (sum / totalCredits).toFixed(2);
}

// Beim Laden anzeigen
displayCourses();
