//Student Class
class Student {
  #name;
  #age;
  #grade;
  #courses;
  #gpa;
  constructor() {
    this.#name;
    this.#age;
    this.#grade;
    this.#courses;
    this.#gpa = 0;
  }

  setName(newName) {
    if (newName.length < 1 || typeof newName != "string") {
      this.#name = "";
      console.log(
        "Please enter a valid name, name set to 'DEFAULT'. You can correct it using setName()"
      );
      return;
    }

    this.#name = newName.toUpperCase();
    return;
  }

  setAge(newAge) {
    if (newAge > 0 && typeof newAge == "number") {
      this.#age = newAge;
    } else {
      this.#age = 0;
      console.log(
        "Invalid age, age has been set to 0. You can correct it using setAge()"
      );
    }
  }

  setGrade(newGrade) {
    if (newGrade > 0 && typeof newGrade == "number") {
      this.#grade = newGrade;
    } else {
      this.#grade = 0;
      console.log(
        "Invalid grade, grade has been set to 0. You can correct it using setGrade()"
      );
    }
  }

  setCourses(courses) {
    this.#courses = courses;
  }

  addCourse(newCourse) {
    this.#courses.push(newCourse);
  }

  getName() {
    return this.#name;
  }

  getAge() {
    return this.#age;
  }

  getGrade() {
    return this.#grade;
  }

  printCourses() {
    return this.#courses.join(", ");
  }

  calculateGpa(newGpa) {
    this.#gpa = newGpa;
  }

  sayHello() {
    let message = `Hi! I'm ${this.#name}, a ${
      this.#age
    } year old student in grade ${this.#grade}!`;
    console.log(message);
  }
}

//Management
let studentRoll = [];

function createStudent(name, age, grade, ...courses) {
  let student = new Student();
  student.setName(name);
  student.setAge(age);
  student.setCourses(courses);
  student.setGrade(grade);
  return student;
}

function enrollStudent(student) {
  studentRoll.push(student);
}

// function searchStudent(name) {
//   name = name.toUpperCase();
//   let students = [];
//   for (index in studentRoll) {
//     if (studentRoll[index].getName() === name) {
//       students.push(studentRoll[index]);
//     }
//   }
//   return students;
// }

function searchStudent(name) {
  return studentRoll.filter((s) => s.getName().includes(name.toUpperCase()));
}

function filterStudentsByGrade(grade) {
  //   let students = [];
  //   for (index in studentRoll) {
  //     if (studentRoll[index].getGrade() === grade) {
  //       students.push(studentRoll[index]);
  //     }
  //   }
  //   return students;
  return studentRoll.filter((s) => s.getGrade() == grade);
}

function filterStudentsByAge(minAge, maxAge) {
  //   let students = [];
  //   for (index in studentRoll) {
  //     if (
  //       studentRoll[index].getAge() > minAge &&
  //       studentRoll[index].getAge() < maxAge
  //     ) {
  //       students.push(studentRoll[index]);
  //     }
  //   }
  //   return students;
  return studentRoll.filter((s) => s.getAge() > minAge && s.getAge() < maxAge);
}
//DOM
let counter = 0;

let form = document.getElementById("form");
let studentName = document.getElementById("nameField");

let age = document.getElementById("ageField");
let grade = document.getElementById("gradeField");
let courses = document.getElementById("courseField");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  textValidator(studentName);
  numberValidator(age);
  numberValidator(grade);
  textValidator(courses);
  if (
    textValidator(studentName) &&
    numberValidator(age) &&
    numberValidator(grade) &&
    textValidator(courses)
  ) {
    studentRoll.push(
      createStudent(
        studentName.value,
        Number(age.value),
        Number(grade.value),
        courses.value
      )
    );
    studentName.value = "";
    age.value = "";
    grade.value = "";
    courses.value = "";
    createTable();
    counter += 1;
  }
  console.log(studentRoll);
  // studentName.value = "";
  // age.value = "";
  // grade.value = "";
  // courses.value = "";
});

function textValidator(field) {
  let p = document.getElementById(`${field.getAttribute("id")}Warning`);
  if (field.value == "") {
    p.style.display = "block";
    return false;
  }
  p.style.display = "none";
  return true;
}

function numberValidator(field) {
  let p = document.getElementById(`${field.getAttribute("id")}Warning`);
  if (field.value == "") {
    p.style.display = "block";
    return false;
  }
  p.style.display = "none";
  return true;
}

// <tr id="task-content1">
//               <th scope="row" id="count1">1</th>
//               <td>Ralph</td>
//               <td id="task1">25</td>
//               <td>5</td>
//               <td>English, French</td>
//             </tr>

let tbody = document.getElementById("tbody");
function createTable() {
  tbody.innerHTML += `<tr id="task-content1">
  <th scope="row" id="count1">${counter}</th>
  <td>${studentRoll[counter].getName()}</td>
  <td id="task1">${studentRoll[counter].getAge()}</td>
  <td>${studentRoll[counter].getGrade()}</td>
  <td>${studentRoll[counter].printCourses()}</td>
</tr>`;
}

let searchBtn = document.getElementById("searchBtn");
let searchField = document.getElementById("searchField");
let tsbody = document.getElementById("tsbody");
let searchTable = document.getElementById("searchTable");
let closeSearch = document.getElementById("closeSearch");
let studentTable = document.getElementById("studentTable");
let closeAll = document.getElementById("closeAll");

function displaySearch() {
  let result = searchStudent(searchField.value);
  tsbody.innerHTML = "";
  for (index in result) {
    tsbody.innerHTML += `<tr id="task-content1">
    <th scope="row" id="count1">-</th>
    <td>${result[index].getName()}</td>
    <td id="task1">${result[index].getAge()}</td>
    <td>${result[index].getGrade()}</td>
    <td>${result[index].printCourses()}</td>
  </tr>`;
  }
}

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  displaySearch();
  studentTable.style.display = "none";
  searchTable.style.display = "block";
});

closeSearch.addEventListener("click", (event) => {
  event.preventDefault();
  searchTable.style.display = "none";
});

closeAll.addEventListener("click", (event) => {
  event.preventDefault();
  studentTable.style.display = "none";
});

let showBtn = document.getElementById("showBtn");
showBtn.addEventListener("click", (event) => {
  event.preventDefault();
  studentTable.style.display = "block";
  searchTable.style.display = "none";
});
