import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaXmark } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";


import "./Book.css";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "bootstrap";

const Book = (props)=>{
    const [bookList,setBookList] =useState([]);

    // const loadBook= ()=>{
    //     axios({
    //         url:`${process.env.REACT_APP_REST_API_URL}/book/`,
    //         method:"get"

    //     })
    //     .then(response=>{
    //         // console.log(response);
    //         setBookList(response.data);
    //     })
    //     .catch(error=>{
    //         window.alert("통신 오류 발생");
    //     });
    // };

    const loadBook = async()=> {
        const response =await axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/`,
            method:"get"
        });
        setBookList(response.data);
    }


    useEffect(()=>{
       loadBook();
    },[]);
    
    //도서 삭제
    const deleteBook =(book) =>{
        const choice = window.confirm("정말 삭제?");
        if(choice === false) return;


        axios({
            // url:`${process.env.REACT_APP_REST_API_URL}/book/`+book.bookId,
            url:`${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
            method:"delete"
        })
        .then(response=>{
            loadBook();
        })
        .catch(err=>{});
    };

    //모달 관련된 처리
    const bsModal =useRef();
    const openModal =()=>{
        const modal = new Modal(bsModal.current);
        modal.show();
    };
    const closeModal = ()=>{
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
        clearBook();
    };

    //등록 관련 state

    const [book,setBook] = useState({
        bookTitle:"",
        bookAuthor:"",
        bookPublicationDate:"",
        bookPrice:"",
        bookPublisher:"",
        bookPageCount:"",
        bookGenre:""
    });

    const addBook =(e)=>{
        setBook({
            ...book,
            [e.target.name] : e.target.value
        });

    };
    //모달에서 값 지우기
    const clearBook = ()=>{
        setBook({
            bookTitle:"",
            bookAuthor:"",
            bookPublicationDate:"",
            bookPrice:"",
            bookPublisher:"",
            bookPageCount:"",
            bookGenre:""
        });
    };

    // //등록 비동기
    // const saveBook = ()=>{
    //     axios({
    //        url:`${process.env.REACT_APP_REST_API_URL}/book/`,
    //        method:"post",
    //        data:book
    //     })
    //     .then(response=>{
    //         loadBook();
    //         closeModal();
    //     })
    //     .catch(err=>{});
    // };

    //async 함수와 await 키워드를 사용한 간소화 작업이 가능
    //-비동기 작업을 동기화된 코드로 작성할 수 있다
    const saveBook = async()=>{
        const response= await axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/`,
            method:"post",
            data:book
        });
        loadBook();
        closeModal();
    };

    //수정

    const editBook = (target)=>{
        setBook({...target});
        openModal();
    };

    //수정 비동기
    const updateBook = ()=>{
        // const{bookId, bookTitle, bookAuthor, bookPublicationDate, bookPrice, bookPublisher, bookPageCount, bookGenre} = book;
        const copyBook ={...book};
        delete copyBook.bookId;

        axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
            method:"put",
            data:copyBook
            // data:{
            //     bookTitle:bookTitle,
            //     bookAuthor:bookAuthor,
            //     bookPublicationDate:bookPublicationDate,
            //     bookPrice:bookPrice,
            //     bookPublisher:bookPublisher,
            //     bookPageCount:bookPageCount,
            //     bookGenre:bookGenre
            // }

        })
        .then(response=>{
            loadBook();
            closeModal();
        })
        .catch(err=>{});


    };
    return(
        <>
           <div className="row">
                <div className="col">
                    <h1>도서 관리</h1>
                    <p>React CRUD 연습 예제</p>
                </div>
           </div>

           {/* 추가버튼 */}
           <div className="row">
                <div className="col">
                    <button className="btn btn-success" onClick={openModal}>
                        <AiOutlinePlus/>
                        추가
                    </button>
                </div>
           </div>

           <div className="row mt-4">
                <div className="col">
                    <table className="table table-striped text-center">
                        <thead>
                            <tr> 
                                <th className="pc-only">도서번호</th>
                                <th>제목</th>
                                <th>저자</th>
                                <th className="pc-only">출간일</th>
                                <th>가격</th>
                                <th className="pc-only">출판사</th>
                                <th className="pc-only">페이지 수</th>
                                <th className="pc-only">장르</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookList.map(book=>(
                                <tr key={book.bookId}>
                                    <td className="pc-only">{book.bookId}</td>
                                    <td>{book.bookTitle}</td>
                                    <td>{book.bookAuthor}</td>
                                    <td className="pc-only">{book.bookPublicationDate}</td>
                                    <td>{book.bookPrice}</td>
                                    <td className="pc-only">{book.bookPublisher}</td>
                                    <td className="pc-only">{book.bookPageCount}</td>
                                    <td className="pc-only">{book.bookGenre}</td>
                                    <td>
                                        <FaRegEdit className ="text-warning" onClick={e=>editBook(book)}/>
                                        <FaXmark className="text-danger" onClick={e=>deleteBook(book)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
           </div>
            {/* Modal */}
            <div className="modal fade" ref={bsModal} id="exampleModal"
                    data-bs-backdrop="static" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {book.bookId === undefined ? 
                            '신규 도서 등록' : `${book.bookId}번 도서 수정`}
                        </h5>
                        
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>

                    </div>
                    <div className="modal-body">

                        <div className="row">
                            <div className="col">
                                <label className="form-label">제목</label>
                                <input type="text" name="bookTitle" className="form-control" 
                                        value={book.bookTitle} 
                                        onChange={addBook}
                                        />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="form-label">저자</label>
                                <input type="text" name="bookAuthor" className="form-control" 
                                        value={book.bookAuthor} 
                                        onChange={addBook}
                                        />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="form-label">출판일</label>
                                <input type="date" name="bookPublicationDate" className="form-control" 
                                        value={book.bookPublicationDate} 
                                        onChange={addBook}
                                        />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="form-label">가격</label>
                                <input type="text" name="bookPrice" className="form-control" 
                                        value={book.bookPrice} 
                                        onChange={addBook}
                                        />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label className="form-label">출판사</label>
                                <input type="text" name="bookPublisher" className="form-control" 
                                        value={book.bookPublisher} 
                                        onChange={addBook}
                                        />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="form-label">페이지 수</label>
                                <input type="text" name="bookPageCount" className="form-control" 
                                        value={book.bookPageCount} 
                                        onChange={addBook}
                                        />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="form-label">장르</label>
                                <select name="bookGenre" className="form-select" value={book.bookGenre} onChange={addBook}>
                                    <option value="">선택하세요</option>
                                    <option>다큐</option>
                                    <option>판타지/무협</option>
                                    <option>소설</option>
                                    <option>자서전</option>
                                    <option>로맨스</option>
                                    <option>수필</option>
                                    <option>추리</option>

                                </select>

                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={closeModal}>닫기</button>
                        {book.bookId === undefined ? 
                            <button className="btn btn-success" 
                            onClick={saveBook}
                            >저장</button> 
                            : 
                            <button className="btn btn-success" 
                            onClick={updateBook}
                            >수정</button>
                            }
                        


                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Book;