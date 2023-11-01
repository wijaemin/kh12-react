import { useState } from "react";

const Exam09 = ()=>{
    //객체 배열 상태 변수
    const [monsters, setMonsters] = useState([
        {no:1, name:"이상해씨", type:"풀"},
        {no:10, name:"파이리", type:"불"},
        {no:20, name:"꼬부기", type:"물"},
        {no:30, name:"피카츄", type:"전기"}



    ]);
    return(
        <>
            <h1>객체 배열 상태변수</h1>
            {monsters.map((monster,index)=>(
                <div key={monster.no}>
                    {index+1}
                    -
                    {monster.no}
                    -
                    {monster.name}
                    -
                    {monster.type}


                </div>
            ))}
        </>


    );

    
};

export default Exam09;