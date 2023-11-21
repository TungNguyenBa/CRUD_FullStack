import { Button, Table } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./StudentCrud.module.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);
function StudentCrud() {
  const [id, setId] = useState("");
  const [stname, setName] = useState("");
  const [course, setCourse] = useState("");
  const [students, setUsers] = useState([]);

  const inputRef = useRef();

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get(
      "https://localhost:7294/api/Student/GetStudent"
    );
    setUsers(result.data);
    console.log(result.data);
  }

  async function register(e) {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7294/api/Student/AddStudent", {
        stname: stname,
        course: course,
      });
      alert("Student Registation Successfully");
      handleClear();
    } catch (err) {
      alert(err);
    }
  }

  async function update(e) {
    e.preventDefault();
    try {
      await axios.patch(
        "https://localhost:7294/api/Student/UpdateStudent/" +
          students.find((x) => x.id === id).id || id,
        {
          id: id,
          stname: stname,
          course: course,
        }
      );
      alert("Registation Updateddddd");
      handleClear();
    } catch (err) {
      alert(err);
    }
  }
  async function editStudent(students) {
    setName(students.stname);
    setCourse(students.course);

    setId(students.id);
  }

  async function deleteStudent(id) {
    await axios.delete(
      "https://localhost:7294/api/Student/DeleteStudent/" + id
    );
    handleClear();
  }

  const handleClear = () => {
    setName("");
    setCourse("");
    inputRef.current.focus();
    Load();
  };

  return (
    <div className={cx("body")}>
      <h1>Student Details</h1>
      <div>
        <input
          type="text"
          hidden
          value={id}
          onChange={(event) => {
            setId(event.target.value);
          }}
        />
        <label>Student Name</label>
        <input
          type="text"
          value={stname}
          onChange={(e) => setName(e.target.value)}
          ref={inputRef}
        />
        <br />
        <label>Course</label>
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        ></input>
      </div>
      <br />
      <Button onClick={register}>Register</Button>
      <Button onClick={update}>Update</Button>
      <br />
      <br />
      <Table>
        <thead>
          <tr>
            <th scope="col">Student Id</th>
            <th scope="col">Student Name</th>
            <th scope="col">Course</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody>
          {students.map(function fn(student) {
            return (
              <tr key={student.id}>
                <th scope="row">{student.id} </th>
                <td>{student.stname}</td>
                <td>{student.course}</td>

                <td>
                  <Button type="button" onClick={() => editStudent(student)}>
                    Edit
                  </Button>
                  <Button
                    type="button"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default StudentCrud;
