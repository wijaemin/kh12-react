import {useEffect, useRef, useState} from "react";
import {Modal} from "bootstrap";
import Jumbotron from './Jumbotron';



const Exam01 = ()=>{

const[todoList, setTodoList] = useState([
  {no:1, title:"학원가기", type:"공부", edit:false},
  {no:2, title:"영어단어외우기", type:"공부", edit:false},
  {no:3, title:"헬스장가기", type:"운동", edit:false},
  {no:4, title:"친구만나기", type:"일상", edit:false},
]);
const [backup, setBackup] = useState([]);

const [data, setData] = useState({
  title:"",
  type:"",
});

const bsModal =useRef();

const changeData = e=>{
  const newData ={
    ...data,
    [e.target.name] : e.target.value
  };
  setData(newData);
  
}




useEffect(()=>{
   setBackup(todoList.map(todo=>{
      const newTodo ={...todo};
      return newTodo; 
   }));
},[]);

//줄을 수정상태로 변경하는 함수
//-이 함수를 실행하려면 최소한 no는 알아야함
//- 함수를 호출할 때 이벤트 정보(e) 대신 todo정보(todo)를 전달하여 처리하도록 처리
const changeToEdit =(target) =>{

  const newTodoList =todoList.map(todo =>{
    if(todo.no === target.no){//target과 같은 상품만큼은
      return{
        ...todo,//다른건 그대로 둬도
        edit:true//edit를 true로 바꿔라
      }
    }
    return todo; //나머진 현상유지
    });
    setTodoList(newTodoList);
};
//줄의 데이터를 변경하는 함수
//-어떤 todo인지(target)와 뭐라고 입력했는지(e)를 알아야 한다
const changeTodo = (target, e) =>{

  const newTodoList = todoList.map(todo => {
    if(todo.no === target.no){//같은 번호를 발견하면
      return{
        ...todo,//나머진 그대로
        [e.target.name] : e.target.value//입력창의 이름에 해당하는 필드값을 입력값으로 바꿔라
      }
    }
    return todo;
  });
  setTodoList(newTodoList);

};

//취소 버튼을 누른 경우 실행할 함수
//- backup에 들어있는 target과 번호가 같은 데이터를 todoList의 target과 같은 번호에 덮어쓰기
const cancelTodo = (target) => {

  const findResult = backup.filter(todo=>todo.no === target.no);

  const newTodoList = todoList.map(todo =>{
      if(todo.no === target.no){
        return{
          ...findResult[0],//다른건 백업데이터로 두고
          edit:false//edit를 false로 바꿔라
        }
      }
      return todo;//나머진 현상유지
  });

    setTodoList(newTodoList);
};

const deleteTodo =(target) =>{
  //todo 삭제
  const newTodoList = todoList.filter(todo=>todo.no !== target.no);
  setTodoList(newTodoList);
  //백업 삭제
  const newBackup = todoList.filter(todo=>todo.no !== target.no);
  setBackup(newBackup);
};

const saveTodo = (target) => {
  
  const newBackup = backup.map(todo =>{
    if(todo.no === target.no){
      return{
        ...target,//변경된 데이터로 저장
        edit:false//edit를 false로
      }
    }
    return todo;//나머지는 유지
  });
  setBackup(newBackup);

  //todo 변경
  const newTodoList = todoList.map(todo =>{
    if(todo.no === target.no){
      return{
        ...todo,
        edit:false
      }
    }
    return todo;

  });

  setTodoList(newTodoList);



};

const addTodo = e=>{
  const last = todoList.length-1
  const no = todoList.length == 0 ? 1 : todoList[last].no+1

  const newTodoList =[
    ...todoList,
    {
      ...data,
      edit:false,
      no:no
    } 
  ];
  setTodoList(newTodoList);

  const newBackup =[
    ...backup, 
    {
        ...data,
        edit:false, 
        no: no
    }

  ];
  setBackup(newBackup);

  //입력창 초기화
  setData({
    title:"",
    type:""
  });
  //모달 닫기
  closeModal();
};
const cancelAddTodo =()=>{
  //입력창 초기화
  setData({
    title:"",
    type:""

  });
  //닫아
  closeModal();
}
    //모달 여는 함수
    const openModal = ()=>{
      // var modal = new Modal(document.querySelector("#exampleModal"));//VanullaJS style
      var modal = new Modal(bsModal.current);//React style
      modal.show();
  };

  const closeModal = ()=>{
    // var modal = Modal.getInstance(document.querySelector("#exampleModal"));//VanullaJS style
    var modal = Modal.getInstance(bsModal.current);//React style
    modal.hide();
}


    return(
        <>
              <div className="row mt-4">
                <div className="col">
                  <button type="button" className="btn btn-primary" 
                          onClick={openModal}>
                  신규등록           
                  </button>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  
                  <table className="table table-striped">
                    <thead>
                        <tr>
                          <th width="10%">번호</th>
                          <th width="40%">제목</th>
                          <th width="10%">종류</th>
                          <th width="40%">관리</th>
                        </tr>
                    </thead>
                    <tbody>
                      {todoList.map((todo,index)=>(
                        todo.edit ? (
                          <tr key={todo.no}>
                          <td>{todo.no}</td>
                          <td>
                            <input className="form-control" type="text" name="title" 
                            value={todo.title} onChange={e=>changeTodo(todo, e)}/>
                            </td>
                          <td>
                            <input className="form-control" type="text" name="type" 
                            value={todo.type} onChange={e=>changeTodo(todo, e)}/>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-warning" 
                              onClick={e=>cancelTodo(todo)}>취소</button>
                            <button className="btn btn-sm btn-danger ms-1" 
                              onClick={e=>saveTodo(todo)}>완료</button>

                          </td>
                        </tr>
                        ) : (
                          <tr key={todo.no}>
                          <td>{todo.no}</td>
                          <td>{todo.title}</td>
                          <td>{todo.type}</td>
                          <td>
                            <button className="btn btn-sm btn-warning" 
                              onClick={e=>changeToEdit(todo)}>수정</button>
                            <button className="btn btn-sm btn-danger ms-1" 
                              onClick={e=>deleteTodo(todo)}>삭제</button>

                          </td>
                        </tr>
                        )



                      ))}

                    </tbody>

                  </table>
                </div>
              </div>

            {/* Modal */}
            <div className="modal fade" ref={bsModal} id="exampleModal" 
                    data-bs-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title fs-5" id="exampleModalLabel">신규 일정 등록</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    
                    <div className="row">
                        <div className="col">
                            <label className="form-label">제목</label>
                            <input name="title" value={data.title} onChange={changeData}
                                    className="form-control"/>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <label className="form-label">종류</label>
                            <input name="type" value={data.type} onChange={changeData}
                                    className="form-control"/>
                        </div>
                    </div>                      
                  
                </div>
                <div className="modal-footer">
                    {/* 자동으로 닫히게 하는 버튼 */}
                    {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button> */}
                    <button type ="button" className="btn btn-secondary" 
                            onClick={cancelAddTodo}>취소</button>
                    <button type="button" className="btn btn-primary" 
                            onClick={addTodo}>추가</button>
                </div>
                </div>
            </div>
            </div>


        </>

    );

};

export default Exam01;