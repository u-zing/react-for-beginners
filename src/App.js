import { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") return;
    setToDos((currentArray) => [toDo, ...currentArray]);
    setToDo("");
  };

  const deleteBtn = (index) => {
    setToDos((currentArray) => currentArray.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.container_title}>📍MY TO DO ({toDos.length})</h1>

      <form
        className={styles.todo}
        onSubmit={onSubmit}
      >
        <input
          className={styles.todo_input}
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do.."
        />
        <button>+</button>
        <button
          onClick={() => setIsVisible(!isVisible)}
          style={{ marginLeft: "10px" }}
        >
          {isVisible ? "▲" : "▼"}
        </button>
      </form>

      <hr />
      {isVisible && (
        <ul>
          {toDos.map((item, index) => (
            <li key={index}>
              <input type="checkbox" />
              {item}
              <button onClick={() => deleteBtn(index)}> ❌ </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
