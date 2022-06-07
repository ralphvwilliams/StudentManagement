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
    if (newName.length < 1) {
      this.#name = "DEFAULT";
      console.log("Please enter a valid name, name set to 'DEFAULT'.");
      return;
    }

    this.#name = newName.toUpperCase();
    return;
  }

  setAge(newAge) {
    if (newAge > 0) {
      this.#age = newAge;
    } else {
      this.#age = 0;
      console.log("Invalid age, age has been set to 0.");
    }
  }

  setGrade(newGrade) {
    if (newGrade > 0) {
      this.#grade = newGrade;
    } else {
      this.#grade = 0;
      console.log("Invalid grade, grade has been set to 0.");
    }
  }

  setCourses(...courses) {
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
    for (let index in this.#courses) {
      console.log(this.#courses[index]);
    }
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

function createStudent(name, age, grade, courses) {
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

function searchStudent(name) {
  name = name.toUpperCase();
  let students = [];
  for (index in studentRoll) {
    if (studentRoll[index].getName() === name) {
      students.push(studentRoll[index]);
    }
  }
  return students;
}

function filterStudentsByGrade(grade) {
  let students = [];
  for (index in studentRoll) {
    if (studentRoll[index].getGrade() === grade) {
      students.push(studentRoll[index]);
    }
  }
  return students;
}

function filterStudentsByAge(minAge, maxAge) {
  let students = [];
  for (index in studentRoll) {
    if (
      studentRoll[index].getAge() > minAge &&
      studentRoll[index].getAge() < maxAge
    ) {
      students.push(studentRoll[index]);
    }
  }
  return students;
}
