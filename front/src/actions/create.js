import axios from "axios";
import { Student } from "../components/Student";

var content = []
var photo = "no photo"
const create = async (
  id,
  name,
  middle_name,
  last_name,
  university,
  course,
  birth_date,
  student_number
) => {
  try {
    const response = await axios.put("http://127.0.0.1:5000/create_student/", {
      id,
      name,
      middle_name,
      last_name,
      university,
      course,
      birth_date,
      student_number,
      photo
    });
    for (let i = 0; i < response.data.length; i++) {
      const item = response.data[i];
      content[i] = new Student(
        item.id,
        item.Name,
        item.Middle_name,
        item.Last_name,
        item.University,
        item.Course,
        item.Birth_date,
        item.Student_number,
        item.Photo
      );
    }
    return content;
    alert(response.data.message);
  } catch (e) {
    alert(e);
  }
};

export default create;
