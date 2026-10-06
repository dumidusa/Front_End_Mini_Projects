import { useState } from "react";

function App(){
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const addTask = () => {
    if(!text.trim()) return;
    setTasks([...tasks, {id: Date.now(), title: text, done: false }]);
    setText("");
  };

  const toggle = id =>
    setTasks(tasks.map(t => (t.id === id ? {...t, done: t.id !== id.done}  : t)));

  const remove = id => setTasks(tasks.filter(t => t.id !== id));

  return (
    <div>
      <input value={text} onChange = {e => setText(e.target.value)}/>
      <button onClick={addTask}>Add</button>

      {tasks.length === 0 && <p>No tasks yet</p>}

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <span onClick={()=> toggle(t.id)}
              style={{textDecoration: t.done ? "line-through" : "none"}}>
                {t.title}
            </span>
            <button onClick={()=> remove(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;