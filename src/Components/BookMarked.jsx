import {  Card, CardContent, CardMedia, IconButton, Typography,  } from '@mui/material'
import React, { useEffect } from 'react'
import kelvinToCelsius from "kelvin-to-celsius"
import moment from "moment"
import axios from 'axios'
import '../App.css'
import { styled } from '@mui/material/styles';
import { useState } from 'react'
import { Box } from '@mui/system'
const BookMarked = ({isBookmarked}) => {
    const [WeatherData , setWeatherData] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      setWeatherData("")
        window.addEventListener('resize', () => setWidth(window.innerWidth))
        const API = "bb4cc4f40ed7892d1bf9e461b521ba7c";
   JSON.parse(localStorage.getItem("Fav")).map((e) => {
       axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=${API}`).then((res) => {
          console.log(res);
          setWeatherData((data) => [...data , res.data])
       })
   })  
    }, [isBookmarked])
    const StyledTypography = styled('Typography')(({ theme }) => ({
        fontSize: "45px",
        [theme.breakpoints.down('sm')]: {
          fontSize: '40px'
        },
      }))
      const StyledTypography2 = styled('Typography')(({ theme }) => ({
        fontSize: "16px",
        [theme.breakpoints.down('sm')]: {
          fontSize: '14px'
        },
      }))
      const Stylediv = styled('Box')(({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          marginTop: '0px'
        },
      }))
  return (
    <div style={{display:'flex' , flexWrap:'wrap' , justifyContent:'center' , alignItems:'center'}}  > {
        WeatherData ? WeatherData.map((WeatherData) => {
            return  (
                 <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , margin:"5px" }}>
              <div style={{ display: 'flex', flexDirection: "column", justifyItems: 'center', alignItems: 'center', textAlign: 'center'}}>
                <div style={{
                  display: 'flex', backgroundColor: "rgba(255, 255, 255, .15)",
                  backdropFilter: "blur(5px)", alighnItems: 'center', padding: '15px', borderRadius: '9px'
                }}>
                  <Card sx={{ background: "linear-gradient(132deg, rgb(221, 221, 221) 0.00%, rgb(110, 136, 161) 100.00%)"}} >
                      <Typography variant="h5" color="black" sx={{ fontFamily: 'Merriweather , serif' }} >{WeatherData?.name}</Typography> &nbsp;
                    <Typography variant='h6'  > <b> {WeatherData?.weather[0].main} </b> </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: "wrap" }}>
                      <div>
                        <CardMedia
                          component="img"
                          image={`http://openweathermap.org/img/wn/${WeatherData?.weather[0].icon}@${width > 422 ? "4x" : "2x"}.png`}
                          alt={WeatherData?.weather[0].main}
                        >
                        </CardMedia> 
                      </div>
                      <div></div>
                      <CardContent sx={{ display: 'flex', justifyContent: "center", gap: "0.5px", flexDirection: 'column', alignItems: "center" }} >
                        <StyledTypography variant='h4'>{kelvinToCelsius(WeatherData?.main.temp)} °C
                        </StyledTypography>
                        <StyledTypography2 >Feels like - {kelvinToCelsius(WeatherData?.main.feels_like)} °C </StyledTypography2><br />
                        <StyledTypography2 >Minimum  - {kelvinToCelsius(WeatherData?.main.temp_max)} °C </StyledTypography2><br />
                        <StyledTypography2 >Maximum  - {kelvinToCelsius(WeatherData?.main.temp_min)} °C </StyledTypography2>
                      </CardContent>
    
                    </div>
                    <Stylediv sx={{ display: "flex", marginTop: '15px', flexDirection: 'row', flexWrap: 'wrap', justifyContent: "center" }}>
                  <div style={{ padding: '20px' }}>
                    <img src="https://img.icons8.com/ultraviolet/344/sunrise--v1.png
" alt="" style={{width:'45px'}}  />
                    <Typography variant="subtitle1">Sunrise</Typography>
                    <Typography variant="caption"> {moment.unix(WeatherData?.sys.sunrise).format('h:mm')} AM</Typography>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <img src="https://img.icons8.com/ultraviolet/344/sunset--v1.png" style={{width:'45px'}}  alt="" />
                    <Typography variant="subtitle1">Sunset</Typography>
                    <Typography variant="caption"> {moment.unix(WeatherData?.sys.sunset).format('h:mm')} PM</Typography>
                  </div>
                  <div style={{ padding: '20px' }}>
                   <img src="https://img.icons8.com/ultraviolet/344/humidity.png" style={{width:'45px'}}  alt="" />
                    <Typography variant="subtitle1">Humidity</Typography>
                    <Typography variant="caption"> {WeatherData?.main.humidity}%</Typography>
                  </div>
                  <div style={{ padding: '20px'   }}>
                 <img src="https://img.icons8.com/ultraviolet/344/wind--v1.png"  style={{width:'45px'}}   alt="" />
                    <Typography variant="subtitle1">Wind</Typography>
                    <Typography variant="caption"> {WeatherData?.wind.speed}Km/hr</Typography>
                  </div>
                </Stylediv>
                  </Card>
                </div>
              </div>
            </div>
        </div>
            )
        }) : <Box style={{height:'60vh' , display:"flex" , justifyContent:'center' , alignItems:'center'}} >
        <Typography variant='h5' sx={{color:'white'}}>Please add your favorite cities</Typography>
        </Box> 
        } </div>
   
   
  )
}

export default BookMarked