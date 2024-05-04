import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AddNewLecture = ({lectureId, courseList}) => {
    const [lectureName, setLectureName] = useState("")
    const [selectedLecture, setSelectedLecture] = useState("")

    // const getClasses = async () => {
    //     console.log("asd")
    //     await axios.get(`http://localhost:3000/api/lecture-list`)
    //         .then((res) => {
    //             console.log(res.data)
    //             setUser(res.data)
    //         })
    // }

    const createLecture = async (courseId) => {
        console.log("fucccccck")
        await axios.post(`http://localhost:3000/api/add-lecture`,
            {
                lectureName: lectureName,
                courseId: courseId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
    }

    useEffect(() => {
        console.log(courseList)
    }, [courseList])

    return (
        <>
            <button
                onClick={() => {
                    getClasses()
                }}
                style={{ background: "white" }}>
                test button
            </button>


            <ul style={{ color: "white" }}>
                {courseList != undefined
                    ? courseList.map((items, i) => (
                        <>
                            <li key={items._id}>{items.courseName}</li>
                            <input
                                style={{ color: "black" }}
                                onChange={(e) => {
                                    setLectureName(e.target.value)
                                }}>

                            </input >
                            <button
                                style={{ background: "black" }}
                                onClick={() => createLecture(items._id)}
                            >
                                create lecture
                            </button>
                            <h2>list of lectures</h2>
                            {items.lectures.map((item, i) =>
                                <>
                                    <div onClick={()=>{
                                        console.log(item._id)
                                        setSelectedLecture(item._id)
                                        lectureId(item._id, items._id)
                                    }}>
                                        <p>{item.lectureName}</p>
                                        <p>{item.date}</p>
                                        <p>{item.attendence}</p>
                                    </div>
                                </>
                            )}
                        </>
                    ))
                    : null
                }
            </ul>

        </>
    )
}

export default AddNewLecture
