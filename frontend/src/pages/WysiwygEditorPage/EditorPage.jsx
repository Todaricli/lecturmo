// import { React, useState } from 'react';
// import ReactQuill, { Quill } from 'react-quill';
// import "react-quill/dist/quill.snow.css";
// import axios from 'axios';

// const toolbarOptions = {
//   toolbar: [
//     [{ font: [] }],
//     [{ header: [1, 2, 3] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ color: ['white'] }, { background: ['white'] }],
//     [{ script: "sub" }, { script: "super" }],
//     ["blockquote", "code-block"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
//     ["link", "image", "video"],
//     ["clean"],
//   ],
// };

// const EditorPage = () => {
//   const [text, setText] = useState("");

//   return (
//     <div className='bg-white m-10 p-10 rounded-md'>
//       <label className=''>Course
//       <input 
//         name='courseName'
//         onInput={{}}
//         placeholder='eg. CompSci732'
//         required='true'
//       />
//       </label>

//       <p className='p-5'>Leave a review</p>
//       <div>
//         <ReactQuill modules={toolbarOptions} theme="snow" onChange={setText} />
//       </div>

//       <p className='p-5'>Rating</p>
      

//     </div>
//   )

// };

// export default EditorPage;