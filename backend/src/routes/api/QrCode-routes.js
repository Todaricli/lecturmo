import { el } from "@faker-js/faker";
import { Router } from "express";

const QrRouters =Router()

QrRouters.get("/qr-code", async(req,res) =>{
    const date = req.query.date
    const courseId = req.query.courseId
    const dateNow = new Date()
    const dateNowString = dateNow.toString()

    const dateDiff = (dateNow - date)/1000
    if(date == undefined){
        res.status(500).send("noo")
        return
    }
    console.log((date - dateNow)/1000)
    if((date - dateNow)/1000 == 3000){
        res.status(200).send("valid")
        return
    }else{
        res.json({date: date, dateNow: dateNow})
        return
    }
    console.log("it ran")

    console.log(date)
    console.log(courseId)

    console.log(date - dateNow)

    res.send({date: date, courseId: courseId})
})

QrRouters.get("/get-server-time", async (req,res) =>{
    const date = new Date()

    res.json({date: date})
})

export default QrRouters