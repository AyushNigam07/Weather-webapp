import { Button, Typography } from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'
import { styled } from '@mui/material/styles';
const Home = (props) => {
  const StyledTypography =  styled('Typography')(({ theme }) => ({
    fontSize:"50px" ,
    [theme.breakpoints.down('sm')]: {
    fontSize:'40px'
    },
  }))
  const StyledTypography2 =  styled('Typography')(({ theme }) => ({
    fontSize:"20px" ,
    [theme.breakpoints.down('sm')]: {
    fontSize:'16px'
    },
  }))
  return (
    <div style={{display:"flex" , flexDirection:'column' , justifyContent:'center' , alignItems:'center' , height:"90vh" ,   margin : '0px 8px'} }>
      <div style={{width:'85vw', display:"flex" , gap:"12px"  , flexDirection:'column' , justifyContent:'center' ,alignItems:"flex-start"   }} >
      <StyledTypography variant='h2'  sx={{fontFamily: 'Merriweather , serif'  , color:'white'}}>
        Weather.io
      </StyledTypography>
      <StyledTypography2 variant='subtitle1' sx={{color:'white' , margin:'6px 0px' }}>The Weather Channel App for Android is your best option for getting accurate weather information. Now with Mesh Network Alerts, you can receive severe weather alerts even without the internet or data.</StyledTypography2>
      <div>
        <Button variant='contained'> <Link style={{textDecoration :'none' , color:'white'}}  to={`/weatherDetails/${props.coords?.latitude}/${props.coords?.longitude}`}>Get Started</Link></Button>
      </div>
      </div>
    </div>
  )
}

export default Home