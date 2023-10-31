import { useEffect, useState } from "react";

const Exam07=()=>{

    //객체로 상태 변수를 정의
    const [member,setMember] = useState({//입력데이터
        memberId:"",
        memberPw:"",
        memberPwRe:""

    });
    const [result, setResult] = useState({//검사결과
        memberId:null,
        memberPw:null,
        memberPwRe:null
    });
    //입력데이터가 변하면 검사결과가 자동으로 계산되도록 처리
    const checkMember = ()=>{
        //console.log("member가변함");
        //ID검사
        const idRegex = /^[a-z][a-z0-9]{7,19}$/;
        const idMatch =  member.memberId.length === 0 ? null : idRegex.test(member.memberId);
        //PW검사
        const pwRegex = /^[A-Za-z0-9!@#$]{8,16}$/;
        const pwMatch = member.memberPw.length === 0 ? null : pwRegex.test(member.memberPw);
        //PW-RE검사
        const pwReMatch =  member.memberPwRe.length === 0 ? null :
                            member.memberPw.length>0 
                            && member.memberPw === member.memberPwRe;

        setResult({
            memberId : idMatch,
            memberPw : pwMatch,
            memberPwRe : pwReMatch
        });
    }
    // useEffect(()=>{checkMember},[member]);

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
                            <input type="text" name="memberId" value={member.memberId} 
                            className={`
                            form-control 
                            ${result.memberId === true ? 'is-valid' :''}
                            ${result.memberId === false ? 'is-invalid' :''}
                            `} 
                            onChange={changeMember} onBlur={checkMember}/>
                            <div className="valid-feedback">멋진 아이디에요</div>
                            <div className="invalid-feedback">사용할 수 없는 아이디에요</div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <label className="form-label">비밀번호</label>
                            <input type="password" name="memberPw" value={member.memberPw} 
                            className={`
                                form-control
                                ${result.memberPw === true ? 'is-valid' :''}
                                ${result.memberPw === false ? 'is-invalid' :''}
                            `} 
                            onChange={changeMember} onBlur={checkMember}/>
                            <div className="valid-feedback">올바른 형식이에요</div>
                            <div className="invalid-feedback">형식이 올바르지 않아요</div>                            
                            
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <label className="form-label">비밀번호 확인</label>
                            <input type="password" name="memberPwRe" value={member.memberPwRe} 
                            className={`
                                form-control
                                ${result.memberPwRe ===true ? 'is-valid' :''}
                                ${result.memberPwRe ===false ? 'is-invalid' :''}
                            `}
                            onChange={changeMember} onBlur={checkMember}/>
                            <div className="valid-feedback">비밀번호가 일치해요</div>
                            <div className="invalid-feedback">비밀번호가 일치하지 않아요</div>
                        </div>
                    </div>
                    
                    <div className="row mt-2 text-end">
                        <div className="col">
                            <button type="button" className="btn btn-outline-success" 
                                disabled = {!(result.memberId ===true && result.memberPw ===true 
                                            && result.memberPwRe ===true)}>
                                 가입하기
                             </button>
                        </div>

                    </div>
                

                </div>

            </div>
        </div>
    );



};
export default Exam07;