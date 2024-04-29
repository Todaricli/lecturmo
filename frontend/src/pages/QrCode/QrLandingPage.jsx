import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import axios from 'Axios'

const QrLandingPage = () => {
    const [params, setParams] = useSearchParams()
    const [date, setDate] = useState(undefined)
    const [course, setCourse] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)

    const submit = async() =>{
        if (date && course) {
            setIsLoading(true)
            const response = await axios.post(`http://localhost:3000/api/qr-code`,
                {
                    "date": date,
                    "courseId": course
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then(setIsLoading(false))

            console.log(response.data.validity)
        }
    }

    useEffect(() => {
        setDate(params.get("date"))
        setCourse(params.get("course"))
    }, [])

    useEffect(() => {
        submit()
    }, [date, course])

    return (
        <div>
            
        </div>
    )
}

export default QrLandingPage
