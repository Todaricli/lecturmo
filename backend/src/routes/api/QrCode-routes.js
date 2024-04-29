import { el } from "@faker-js/faker";
import { Router } from "express";

const QrRouters =Router()

function convertToDateObject(date) {
    const [time, rubbish] = date.split(".")
    const timez = time+"z"
    const timezOb = new Date(timez)

    return timezOb
}

QrRouters.get("/qr-code", async(req,res) =>{
    const date = req.query.date
    const courseId = req.query.courseId

    const dateNowSkeet =  await fetch(`http://worldtimeapi.org/api/timezone/Pacific/Auckland`)
    const dateNowJson = await dateNowSkeet.json()
    const dateNow = dateNowJson.utc_datetime

    const dateObject = convertToDateObject(date)
    const dateNowObject = convertToDateObject(dateNow)

    console.log(dateObject)
    console.log(dateNowObject)

    const difference = (dateNowObject - dateObject)/1000

    if(date == undefined){
        res.status(500).send("yagotproblems")
        return
    }

    //set expiry time here skeet
    if(difference < 30){
        res.json({date: dateObject, dateNow: dateNowObject, difference: difference, validity: true, skeets: "in joy"})
        return
    }else{
        res.json({date: dateObject, dateNow: dateNowObject, difference: difference, validity: false, skeets: "in anger"})
        return
    }
})

export default QrRouters