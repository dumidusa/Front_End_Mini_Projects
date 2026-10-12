//a reusable ProfileCard component (props) witha like btn

import { useState } from "react";

export default function ProfileCard({name, role}){
    const [likes,setLikes] = useState(0);

    return(
      <div style={{border: "1px solid #ccc", padding:12, margin: 8}}>
        <h1>{name}</h1>
        <p>{role}</p>
        <button onClick={()=> setLikes(likes +1)}> {likes}</button>
        <button onClick={()=> setLikes(likes > 0 ? likes - 1 : 0)}>down</button>
      </div>
    );
}



