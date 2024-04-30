import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import axios from 'Axios'
import VerificationSuccess from "../ScanVerificationPage/VerificationSuccessPage.jsx"
import VerificationError from "../ScanVerificationPage/VerificationErrorPage.jsx"

const QrLandingPage = () => {
    const [params, setParams] = useSearchParams()
    const [date, setDate] = useState(undefined)
    const [course, setCourse] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)
    const [response, setResponse] = useState(undefined)
    const [validity, setValidity] = useState()

    const submit = async () => {
        
        if (date && course) {
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
            ).then((response) => {
                setResponse(response)
                console.log("skeet")
            })
            
        }
    }

    // useEffect(()=>{
    //     const response = submit()
    //     console.log("hi")
    //     console.log(response)
    //     setResponse(response)
    // },[])

    useEffect(() => {
        setDate(params.get("date"))
        setCourse(params.get("course"))
    }, [])

    useEffect(() => {
        submit()
    }, [date, course])

    useEffect(() => {
        if (response != undefined) {
            setValidity(response.data.validity)
            console.log(response.data.validity)
            setIsLoading(false)
        }
    }, [response])


    return (
        <div>
            {isLoading
                ? <h1>LOADING IJIOT</h1>
                : <>
                    {validity
                        ? <VerificationSuccess />
                        : <VerificationError />
                    }
                </>
            }

        </div>
    )
}

export default QrLandingPage
