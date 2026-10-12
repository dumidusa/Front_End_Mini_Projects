import { useState } from "react";


type CounterProps = {
  title: string;
  start: number;
  step: number;
  max: number;
};

export default function Counter({title, start, step,max}: CounterProps){
    const[count, setCount] = useState(start);

    return (
        <div
            style={{border: "1px solid #ccc", padding: 12, margin: 8}}
        >
            <h3>{title}</h3>
            <h1>{count}</h1>
            <button onClick={()=>setCount(count - step)}> -{step}</button>
            <button onClick={()=>setCount(count + step)}> +{step}</button>
            <button onClick={()=>setCount(start)}> Reset </button>
<button onClick={() => setCount(Math.min(max, count + step))}>+{step}</button>
        </div>
    );
}