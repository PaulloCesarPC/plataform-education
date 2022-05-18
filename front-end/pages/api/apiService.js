import axios from 'axios';

const API_URL = 'http://localhost:3001/users/';


async function getAllStudents() {
  const res = await axios.get(API_URL);

  let students = res.data.map((student) => {
    return {
      student
    };
  });

  students = Array.from(students);

  return students;
}

// async function insertGrade(grade) {
//   const response = await axios.post(API_URL, grade);
//   return response.data.id;
// }

// async function updateGrade(grade) {
//   const response = await axios.put(API_URL, grade);
//   return response.data;
// }

// async function deleteGrade(grade) {
//   const response = await axios.delete(`${API_URL}/${grade.id}`);
//   return response.data;
// }



export {
  getAllStudents,
  // insertGrade,
  // updateGrade,
  // deleteGrade,
};
