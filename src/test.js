import { useState } from "react";
import "./App.css";

// Component
function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "Untitled",
    email: "test@mail.com",
    address: "islamabad",
  });

  const [index, setIndex] = useState(0);

  // HTML FORM => STATE FORMDATA  // ONE WAY
  // STATE FORMDATA => HTML FORM  // TWO WAY

  function formOnchange(value, key) {
    if (key === "name") {
      setFormData({ ...formData, name: value });
    } else if (key === "address") {
      setFormData({
        ...formData,
        address: value,
      });
    } else if (key === "email") {
      setFormData({
        ...formData,
        email: value,
      });
    }
  }

  const onAddStudent = () => {
    setStudents([...students, formData]);
  };

  const onDelete = (index) => {
    setStudents(students.filter((item, i) => i !== index));
  };
  const onEdit = (i) => {
    const item = students[i];
    setFormData(item);
    setIndex(i);
  };

  const onUpdateStudent = () => {
    // [1,2,3,4] map => [1,2,6,4]
    // const listWithUpdatedStudent = students.map((item,i)=> {
    //   if(index === i){
    //     return formData
    //   } else {
    //     return item;
    //   }
    // });
    let studentsClone = [...students];
    studentsClone[index] = formData;
    // XX students[index] = formData; XX //
    setStudents(studentsClone);
  };

  return (
    <main className="p-8">
      <div>
        index: {index}
        Name
        <input
          value={formData.name} // useState formData => html input
          onChange={(event) => formOnchange(event.target.value, "name")}
        ></input>
        Email
        <input
          value={formData.email}
          onChange={(event) => formOnchange(event.target.value, "email")}
        ></input>
        Address
        <input
          value={formData.address}
          onChange={(event) => formOnchange(event.target.value, "address")}
        ></input>
      </div>

      <div className="flex space-x-2 ml-12 mt-4">
        <button
          className="border shadow bg-blue-400 rounded px-4 p-1"
          onClick={() => onAddStudent()}
        >
          Add Student
        </button>
        <button
          className="border shadow bg-teal-400 rounded px-4 p-1"
          onClick={() => onUpdateStudent()}
        >
          Update Student info
        </button>
      </div>

      {students.map((item, i) => {
        return (
          <div key={i} className="grid grid-cols-7">
            <span>{item.name}</span>
            <span>{item.email}</span>
            <span>{item.address}</span>

            <div className="flex space-x-2 justify-between">
              <span
                className="text-red-600 font-bold"
                onClick={() => onDelete(i)}
              >
                DELETE
              </span>
              <span
                className="text-teal-600 font-bold"
                onClick={() => onEdit(i)}
              >
                EDIT
              </span>
            </div>
            {/* <button
              className="border shadow bg-teal-400 rounded px-4 p-1"
              onClick={() => onUpdateStudent(i)}
            >
              Update Student info
            </button> */}
          </div>
        );
      })}
    </main>
  );
}

export default App;
