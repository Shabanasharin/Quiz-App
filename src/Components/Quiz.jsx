import React, { useRef, useState } from 'react'
import { data } from '../assets/data';

function Quiz() {
  let [index,setIndex] = useState(0);
  let [question,setQuestion] = useState(data[index]);
  let [lock,setLock] = useState(false);
  let [score,setScore] = useState(0);
  let [result,setResult] =useState(false)
  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array =[ option1,option2,option3,option4];
  const checkAns = (e,ans)=>{
    if(lock === false){
        if(question.ans===ans){
          e.target.classList.add("correct");
          setLock(true);
          setScore(prev=>prev+1);
        }else{
          e.target.classList.add("wrong");
          setLock(true);
          option_array[question.ans-1].current.classList.add("correct");
        }
    }
 
  }
  const next = ()=>{
    if(lock===true){
      if (index == data.length-1){
          setResult(true);
          return 0;
      }
     setIndex(++index);
     setQuestion(data[index]);
     setLock(false);
     option_array.map((option)=>{
    //  option.current.classList.remove("wrong");
    option.current.classList.remove("wrong");

     option.current.classList.remove("correct");
     return null;

     })
    }
}
// const next = () => {
//   if (lock) {
//     if (index === data.length - 1) {
//       setResult(true);
//       return 0;
//     }
//     setIndex(prev => prev + 1);
//     setLock(false);
//     option_array.forEach(option => {
//       option.current.classList.remove('wrong');
//       option.current.classList.remove('correct');
//     });
//   }
// };

 const reset = ()=>{
  setIndex(0);
  setQuestion(data[0]);
  setScore(0);
  setLock(false);
  setResult(false);
 }
  return (
    <div className='container  d-flex  justify-content-center align-items-center'>
       <div className ='shadow'  style={{width:'700px', height:"auto",border:"1px solid ",borderRadius:"8px",padding:"25px",marginTop:"175px"}}>
            <h1 className='text-center'>Quiz App</h1>
            <hr />
            {result?<></>:<><h2>{index+1}.{question.question}</h2>
            <ul>
              <div className='d-flex'>
                <li style={{listStyle:"none"}} ref={option1}  onClick={(e)=>{checkAns (e,1)}}><div className='options '>{question.option1}</div></li>
                <li style={{listStyle:"none"}} ref={option2} onClick={(e)=>{checkAns (e,2)}}><div className='options ms-3'>{question.option2}</div></li>
              </div>
                 <div className='d-flex'>
                   <li style={{listStyle:"none"}} ref={option3}  onClick={(e)=>{checkAns (e,3)}}><div className='options mt-3'>{question.option3}</div></li>
                   <li style={{listStyle:"none"}} ref={option4}  onClick={(e)=>{checkAns (e,4)}}><div className='options mt-3 ms-3'>{question.option4}</div></li> 
                 </div>
             
            </ul>
            <div className='d-flex justify-content-end'><div className='btn btn-success' style={{width:"150px"}} onClick={next}>Next</div></div>
            <div className='text-center'>{index+1} of {data.length} question</div></>}
            {result?<> <h2>You Score {score} out of {data.length}</h2>
            <button className='btn btn-primary mt-3' style={{width:'100px',marginLeft:"250px"}} onClick={reset}>Reset</button></>:<></>}
            
            {/* <h2>{index+1}.{question.question}</h2> */}
            {/* <ul>
               <li ref={option1} onClick={(e)=>{checkAns (e,1)}}>{question.option1}</li>
               <li ref={option2}  onClick={(e)=>{checkAns (e,2)}}>{question.option2}</li>
               <li ref={option3}  onClick={(e)=>{checkAns (e,3)}}>{question.option3}</li>
               <li ref={option4}  onClick={(e)=>{checkAns (e,4)}}>{question.option4}</li> 
            </ul>
            <div className='btn btn-success' onClick={next}>Next</div>
            <div className='text-center'>{index+1} of {data.length} question</div> */}
       </div>
    </div>
  )
}

export default Quiz