import { useState } from "react";

const Exam07=()=>{

    //객체로 상태 변수를 정의
    const [member,setMember] = useState({
        memberId:"",
        memberPw:"",
        memberPwRe:""

    });
    
    //객체의 상태를 한 번에- 변경하는 함수를 구현
    const changeMember = (e)=>{

        setMember({
            ...member,
            [e.target.name] : e.target.value


        });
    };

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 offset-md-4">

                    <div className="row">
                        <div className="col text-center">
                            <h1>회원가입</h1>
                        </div>
                    </div>
                    
                    <div className="row mt-2">
                        <div className="col">
                            <label className="form-label">아이디</label>
                            <input type="text" name="memberId" value={member.memberId} className="form-control" onChange={changeMember}/>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <label className="form-label">비밀번호</label>
                            <input type="password" name="memberPw" value={member.memberPw} className="form-control" onChange={changeMember}/>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <label className="form-label">비밀번호 확인</label>
                            <input type="password" name="memberPwRe" value={member.memberPwRe} className="form-control" onChange={changeMember}/>
                        </div>
                    </div>
                    
                    <div className="row mt-2 text-end">
                        <div className="col">
                            <button type="submit" className="btn btn-outline-success">가입하기</button>
                        </div>

                    </div>
                

                </div>

            </div>
        </div>
    );



};
export default Exam07;