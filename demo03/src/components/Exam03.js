import { useState } from "react";

function Exam03(){

    const[money,setMoney] = useState(0);

    const fontColor = {
        color : "blue",
    }
    return(
       <>
       <h1 style={fontColor}>출금 금액:{money}원</h1>



       <button className="btn btn-success me-2" onClick={()=>setMoney(money+100000)}>10만원</button>
       <button className="btn btn-info me-2" onClick={()=>setMoney(money+50000)}>5만원</button>
       <button className="btn btn-warning me-2" onClick={()=>setMoney(money+10000)}>1만원</button>
       <button className="btn btn-danger me-2" onClick={()=>setMoney(0)}>초기화</button>
       </> 


    )
}
export default Exam03;