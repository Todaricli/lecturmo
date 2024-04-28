import { useEffect, useState } from "react"
import QRCode from "react-qr-code";


const QrCode = () => {
    const [qrCode, setQrCode] = useState("")

    useEffect(()=>{
        setInterval(() => {
            const date = new Date()
            console.log(date.toString())
            setQrCode(date.toString())
          }, 1500);
    },[])

  return (
    <div>
      <h1>asdasdsad</h1>
      <QRCode value={qrCode}/>
    </div>
  )
}

export default QrCode
