import { useEffect, useState } from "react";
import axios from "axios";
import { FaXmark } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";


import "./Book.css";

const Book = (props)=>{
    const [bookList,setBookList] =useState([]);

    const loadBook= ()=>{
        axios({
            url:"http://localhost:8080/book/",
            method:"get"

        })
        .then(response=>{
            // console.log(response);
            setBookList(response.data);
        })
        .catch(error=>{
            window.alert("통신 오류 발생");
        });
    };
    useEffect(()=>{
       loadBook();
    },[]);
    
    //도서 삭제
    const deleteBook =(book) =>{
        const choice = window.confirm("정말 삭제?");
        if(choice === false) return;


        axios({
            // url:"http://localhost:8080/book/"+book.bookId,
            url:`http://localhost:8080/book/${book.bookId}`,
            method:"delete"
        })
        .then(response=>{
            loadBook();
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
                                        <FaRegEdit className ="text-warning"/>
                                        <FaXmark className="text-danger" onClick={e=>deleteBook(book)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
           </div>
        </>
    );
};

export default Book;