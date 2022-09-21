import React, { useContext } from 'react'
import {AppBar , InputBase, Toolbar, Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import {BiSearchAlt} from "react-icons/bi"
import { Context } from '../App'
const Navbar = () => {
  const [WeatherData, setWeatherData , setCity , city] = useContext(Context)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  function handleKeyPress(e) {
    var key = e.key;
    console.log( "You pressed a key: " + key );
    if (key == "Enter") {
     setCity(e.target.value)
    }
}
  const StyledTypography =  styled('Typography')(({ theme }) => ({
    fontSize:"27px" ,
    [theme.breakpoints.down('sm')]: {
 display : WeatherData ? "none" : "block"
    },
  }))
 const  Styleddiv = styled('Typography')(({ theme }) => ({ 
  backgroundColor:'rgba(255, 255, 255, .15)' ,
   display:'flex' ,
    alignItems:'center' ,
    borderRadius:'6px',
    [theme.breakpoints.down('sm')]: {
      width :'100%'
      },
  }))
  return (
    <div>
      
<AppBar position='static' sx={{backgroundColor: "rgba(255, 255, 255, .15)" ,
 backdropFilter: "blur(5px)"}} > 
<Toolbar sx={{display:'flex' , justifyContent:'space-between'}}>
<StyledTypography variant='h4' sx={{fontFamily:'Oswald'}}>Weather.io</StyledTypography>
{ WeatherData &&
   <Styleddiv>
  <BiSearchAlt style={{padding:'5px'}}/>
  <InputBase placeholder='Search your city' sx={{color:"white"}} onKeyPress={(e) => handleKeyPress(e)}  />
  </Styleddiv>
}
</Toolbar>
</AppBar>
    </div>
  )
}

export default Navbar