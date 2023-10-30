import { useState } from "react";

function Exam03(){

    const[money,setMoney] = useState(0);

    const fontColor = {
        color : "blue",
    }
    return(
       <>
        <h1>세 번째 예제</h1>
       
        <h1 style={fontColor}>출금 금액:{money}원</h1>



       <button className="btn btn-outline-success me-2" onClick={()=>setMoney(money+100000)}>10만원</button>
       <button className="btn btn-outline-info me-2" onClick={()=>setMoney(money+50000)}>5만원</button>
       <button className="btn btn-outline-warning me-2" onClick={()=>setMoney(money+10000)}>1만원</button>
       <button className="btn btn-outline-danger me-2" onClick={()=>setMoney(0)}>초기화</button>
       <br/>
       <input type="range" min="0" step="10000" max="10000000"value={money} onChange={e=>setMoney(parseInt(e.target.value))}/>

       </> 


    )
}
export default Exam03;