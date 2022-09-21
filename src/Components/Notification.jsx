import { NotificationAdd } from '@mui/icons-material';
import { Button, Paper, Typography } from '@mui/material';
import kelvinToCelsius from 'kelvin-to-celsius';
import { useContext } from 'react';
import  { useEffect } from 'react'
import { useState } from 'react';
const Notification = (props) => {
  useEffect(() => {
    window.Notification.requestPermission().then(e => {
      if(e == "granted" && props.WeatherData){
        setPermission(true)
      new window.Notification(props.WeatherData?.name, { body: `${kelvinToCelsius(props.WeatherData?.main.temp)}` });
    }
    else{
      setPermission(false)
    }
  })
  }, [props.WeatherData])
  const [isPermitted , setPermission] = useState()
  const handelClick = async  () => {
    console.log()
       window.Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            alert("Already granted")
          } 
        });
    }
  return (
    <div style={{padding:'20px' , display:'flex' , justifyContent:'center' }}  >
        <Paper sx={{display:'flex' , background: "linear-gradient(132deg, rgb(221, 221, 221) 0.00%, rgb(110, 136, 161) 100.00%)" , justifyContent:'center' , height:"30vh" , width:'95vw'   , alignItems:'center' , flexDirection:'column'  }}   >
<Button variant='outlined'  onClick={()=>handelClick()} > Turn on Notifications <NotificationAdd/>  </Button>
<Typography variant="body2"  > Notifications are {isPermitted ? "ON" : "OFF"}  </Typography>
        </Paper>

    </div>
  )
}

export default Notification