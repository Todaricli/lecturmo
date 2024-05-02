import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AddNewLecture = () => {
    const [user, setUser] = useState()
    const [lectureName, setLectureName] = useState("")

    const getClasses = async () => {
        console.log("asd")
        await axios.get(`http://localhost:3000/api/lecture-list`)
            .then((res) => {
                console.log(res.data)
                setUser(res.data)
            })
    }

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
        console.log(user)
    }, [user])

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
                {user != undefined
                    ? user.map((items, i) => (
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
                        </>
                    ))
                    : null
                }
            </ul>
        </>
    )
}

export default AddNewLecture
