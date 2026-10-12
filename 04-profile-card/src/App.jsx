import ProfileCard from "./profileCard";
import Counter from "./Counter";
export default function App(){
  return(
    <div>
      <ProfileCard name="kasun" role="FrontEnd Dev"/>
      <ProfileCard name="Nirmai" role="Backend Dev"/>


    <Counter title="steps" start={0} step={1} max={200}/>
    <Counter title="water (ml)" start={500} step={250}  max={2000}/>

  </div>

  );
}