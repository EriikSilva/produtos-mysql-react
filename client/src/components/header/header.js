import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import {Link} from "react-router-dom";


const Header = () =>{
    return (
    <header>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
        </IconButton>
          <Link to="/">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ICTS TESTE
          </Typography>
          </Link>
          {/* <Link to='/page2' color="inherit">Login</Link> */}
        </Toolbar>
      </AppBar>
    </Box>
        </header>
    )  
}

export default Header;