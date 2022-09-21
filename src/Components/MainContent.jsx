import { Badge, Box, Card, CardContent, CardMedia, IconButton, LinearProgress, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { GiSunrise } from "react-icons/gi"
import { GiSunset } from "react-icons/gi"
import kelvinToCelsius from "kelvin-to-celsius"
import { WiHumidity } from "react-icons/wi"
import { BsBookmarkHeart, BsBookmarkHeartFill, BsWind } from "react-icons/bs"
import moment from "moment"
import axios from 'axios'
import '../App.css'
import { Context } from '../App'
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { useState } from 'react'
import BookMarked from './BookMarked'
import Notification from './Notification'
const MainContent = (props) => {
  const [WeatherData, setWeatherData, setCity, city] = useContext(Context);
  const [isBookmarked, setIsBookmarked] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  console.log(city);
  const { lat, lon } = useParams()
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
    const fetchData = async () => {
      console.log(lat, lon)
      await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=96d4fde1babb4fe29b8231f416a26c50 `).then((result) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city ? city : result.data.features[0].properties.city}&appid=bb4cc4f40ed7892d1bf9e461b521ba7c
        `).then((result) => {
          setWeatherData(result.data)
          console.log(result.data)
        }
        ).catch((err) => {
          alert("Invalid city name")
        })
      }
      )
    }
    fetchData();
  }, [city])
  const StyledTypography = styled('div')(({ theme }) => ({
    fontSize: "45px",
    [theme.breakpoints.down('sm')]: {
      fontSize: '40px'
    },
  }))
  const StyledTypography2 = styled('div')(({ theme }) => ({
    fontSize: "16px",
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px'
    },
  }))
  const StyledTypography3 = styled('h3')(({ theme }) => ({
    fontSize: "40px",
    [theme.breakpoints.down('sm')]: {
      fontSize: '30px'
    },
  }))
  const Stylediv = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      marginTop: '0px'
    },
  }))
  const Stylediv2 = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      height:"auto",
      margin:'10px'
    },
    [theme.breakpoints.up('sm')]: {
      height:"90vh"
    },
  }))
  const Bookmark = (name) => {
    console.log(name)
    const check = JSON.parse(localStorage.getItem("Fav"))
    console.log(check);
    if (check) {
      if (check.includes(name)) {
        const Fav = JSON.parse(localStorage.getItem("Fav"))
        const modifiedArray = Fav.filter((e) => {
          return e !== name;
        })
        console.log(modifiedArray)
        localStorage.setItem("Fav", JSON.stringify(modifiedArray))
        setIsBookmarked(false)
      }
      else {
        const Fav = check;
        Fav.push(name);
        console.log(Fav)
        setIsBookmarked(true)
        localStorage.setItem("Fav", JSON.stringify(Fav))
      }
    }
    else {
      const Fav = new Array()
      Fav.push(name);
      localStorage.setItem("Fav", JSON.stringify(Fav));
    }
    console.log(check)
  }
  return (
    WeatherData ?
      <>
        <Stylediv2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: "column", justifyItems: 'center', alignItems: 'center', textAlign: 'center' }}>
            <div style={{
              display: 'flex', backgroundColor: "rgba(255, 255, 255, .15)",
              backdropFilter: "blur(5px)",  alignItems: 'center', padding: '15px', borderRadius: '9px'
            }} >
              <Card sx={{ background: "linear-gradient(132deg, rgb(221, 221, 221) 0.00%, rgb(110, 136, 161) 100.00%)"}} >
                <Box style={{ display: 'flex' ,  margin: '4px', justifyContent: 'center', alignItems: 'center' }}  >
                  <Typography variant="h5" color="black" sx={{ fontFamily: 'Merriweather , serif' }} >{WeatherData?.name}</Typography> &nbsp;
                  {
                    localStorage.getItem("Fav").includes(WeatherData?.name) || isBookmarked ?
                      <IconButton onClick={() => Bookmark(WeatherData?.name)} >
                        <BsBookmarkHeartFill size={20} />
                      </IconButton> :
                      <IconButton onClick={() => Bookmark(WeatherData?.name)} >
                        <BsBookmarkHeart size={20} />
                      </IconButton>
                  }
                </Box>
               <Typography variant='h6'> <b> {WeatherData?.weather[0].main} </b> </Typography>
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
                  <CardContent sx={{ display: 'flex', justifyContent: "center", flexDirection: 'column', alignItems: "center" }} >
                    <StyledTypography variant='h4'>{kelvinToCelsius(WeatherData?.main.temp)}<sup><small>°C</small> </sup>
                    </StyledTypography>
                    <StyledTypography2 >Feels like - {kelvinToCelsius(WeatherData?.main.feels_like)} <sup><small>°C</small> </sup> </StyledTypography2><br />
                    <StyledTypography2 >Minimum  - {kelvinToCelsius(WeatherData?.main.temp_max)} <sup><small>°C</small> </sup> </StyledTypography2><br />
                    <StyledTypography2 >Maximum  - {kelvinToCelsius(WeatherData?.main.temp_min)} <sup><small>°C</small> </sup> </StyledTypography2>
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
        </Stylediv2>
        <div>
          <StyledTypography3 variant='h3' style={{ textAlign: 'center', fontFamily: 'Merriweather , serif', color: "white", padding: '3px' }}>Favorites</StyledTypography3>
          <BookMarked isBookmarked={isBookmarked} />
        </div>
        <div>
          <Notification WeatherData={WeatherData} />
        </div>
      </> :
      <>
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      </>
  )
}


export default MainContent