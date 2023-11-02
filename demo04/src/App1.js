import Exam01 from './components/Exam01';
import Jumbotron from './components/Jumbotron';

function App() {
  return (
    <div className="container-fluid MY-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">

          {/* 점보트론을 만들면서 제목과 내용을 전달 */}
          <Jumbotron title="일정 관리 프로그램" content="KH정보교육원 수업자료"/>

          {/* 화면 */}
      <hr/>
      <Exam01/>

        </div>
      </div>
    </div>
  );
}

export default App;