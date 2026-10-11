import { useEffect, useState } from "react";

const API = "http://localhost:5018/api/tasks";

export default function App(){
  const [tasks,setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [text, setText] = useState("");





  useEffect(()=>{
    async function load(){
      try{
        const res = await fetch(API);
        if(!res.ok) throw new Error(`server error ${res.status}`);
        setTasks(await res.json());

      }catch(err){

        setError(err.message);

      }finally{
        setLoading(false);
      }
    }
    load();
  },[]);

  //handlers 
  async function addTasks(e){
    e.preventDefault(); //stop page reload from <form>
    if(!text.trim()) return;

    const res = await fetch(API, {
      method : "POST",
      headers: {"Content-Type" : "application/json"},
      body:  JSON.stringify({title : text}),
    });


    const newTask = await res.json(); //has _id from mongoDB
    setTasks(prev => [...prev, newTask]);
    setText("");
  }

  async function toggleTask(id){
    const res = await fetch(`${API}/${id}`, {method: "PATCH"});
    const updated = await res.json();
    setTasks(prev => prev.map(t => t._id === id ? updated : t));
  }

  async function deleteTasks(id){
    await fetch(`${API}:${id}`, {method: "DELETE"});
    setTasks(prev => prev.filter( t => t._id !== id));
  }


  if (loading) return <p>Loading....</p>;
  if(error) return <p style = { {color: "red"}}> error </p>;


  return (
  <div> 
    <form onSubmit={addTasks}>
        <input value={text} onChange={e => setText(e.target.value)} />
        <button>Add</button>
    </form> 
    <ul>
      {tasks.map(t => <li key={t.id}>
        <span onClick={()=> toggleTask(t._id)}
          style={{textDecoration: t.done ? "line-through" : "none", cursor: "pointer"}}
        > {t.title} </span>
        
        <button onClick={()=> deleteTasks(t._id)}> X </button>
        
        </li>)}
    </ul>
  </div>
  )

}
