import { useState } from "react";

function Exam04(){

    const[text,setText] = useState(0);
    return(
        <>
        <h1>Exam04 문제풀이</h1>

        <h2>(Q) 주말에 뭐하세요?</h2>
        <textarea maxLength={1000} rows={4} cols={100} onChange={e=>setText(e.target.textLength)}></textarea>
        <br/>
        <span>{text}</span>/1000 bytes

        </>

    )
}

export default Exam04;