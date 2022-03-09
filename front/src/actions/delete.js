import axios from "axios";
import { Student } from "../components/Student";

var content = [];
const Delete = async (id) => {
  try {
    const response = await axios.delete(
      "http://127.0.0.1:5000/delete_student/" + id, {});
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
  } catch (e) {
    alert(e);
  }
};

export default Delete;
