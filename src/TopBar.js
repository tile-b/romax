import React from 'react';
import { Box, Typography, useTheme, useMediaQuery, Badge } from '@mui/material'; // Import Badge
import { ShoppingCart } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import MenuIcon from '@mui/icons-material/Menu';
import logo from './img/romaxLogo.png';
import doc from './img/document.png';
import { useCart } from './CartContext'; // <-- 1. IMPORT THE HOOK
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

export default function TopBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { totalItemsInCart } = useCart();

  const [showCart, setShowCart] = useState(false);

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

const DrawerList = (
  <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)}>
    <List>

      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon sx={{ color: 'white', minWidth: 50, '& svg': { fontSize: 30 } }}>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText
            primary="O Nama"
            primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.3rem' }}
          />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: 50 }}>
            <img src={doc} alt="P" style={{ height: 32 }} />
          </ListItemIcon>
          <ListItemText
            primary="Proizvodi"
            primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.3rem' }}
          />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon sx={{ color: 'white', minWidth: 50, '& svg': { fontSize: 30 } }}>
            <ContactPhoneIcon />
          </ListItemIcon>
          <ListItemText
            primary="Kontakt"
            primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.3rem' }}
          />
        </ListItemButton>
      </ListItem>

    </List>
  </Box>
);
useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 200) { // show after scrolling 200px
      setShowCart(true);
    } else {
      setShowCart(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
  
  return (
    <>
<Box
  sx={{
    // borderBottom: '1px solid #001788', // 1. Remove this line
    px: 2,
    py: 1,
    bgcolor: 'transparent',
    position: 'relative', // 2. Add this
    
    // 3. Add this entire block
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80%',
      height: '1px',
      backgroundColor: '#001788', // This is your border color
    },
  }}
>
      {/* Row container */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'center' : 'space-between', // Use space-between on desktop
          flexDirection: isMobile ? 'column' : 'row', // stack on mobile
          maxWidth: 1200,
          mx: 'auto',
          gap: isMobile ? 2 : 4, // Gap between [Logo+Icons] and [Info]
        }}
      >
        {/* START: New Wrapper for Logo and Icons */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row', // Always in a row
            justifyContent: isMobile ? 'space-between' : 'flex-start', // Spread on mobile
            width: isMobile ? '100%' : 'auto', // Take full width on mobile
            gap: isMobile ? 2 : 5, // Gap between Logo and Icons block
          }}
        >
          {/* Left - Logo */}
          <Link to="/">
          <img
            src={logo}
            alt="Logo"
            style={{
              height: isMobile ? 120 : 250,
              width: 'auto',
            }}
          /></Link>

          {/* Middle - Icons */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? 3 : 5, // Gap between individual icons
              // mt: isMobile ? 1 : 0, // No longer needed, parent aligns
            }}
          >
            <Link to="/cart" className='customLink'>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': { color: '#1a3a82' },
              }}
            >
<Badge badgeContent={totalItemsInCart} color="error">
  
                <ShoppingCart />
               
              </Badge>
            </Box> </Link>
    <Button onClick={toggleDrawer(true)}>
                        <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': { color: '#1a3a82' },
              }}
            
            >  
              <MenuIcon />
            </Box>      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}
      PaperProps={{
      sx: {
backgroundColor: '#2e3d58ff',
color: 'white',
      }}}
      >
        {DrawerList}
      </Drawer>
          </Box>
        </Box>
        {/* END: New Wrapper */}

        {/* Right - Info box */}
        <Box
          sx={{
            display: isMobile ? 'none' : 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            px: 2,
            py: 0.5,
            borderRadius: 1,
            maxWidth: 380,
            fontSize: 19,
            width: isMobile ? '100%' : 'auto', // Ensure it takes width on mobile
          }}
        >
          <Typography sx={{ color: 'red', fontWeight: 'bold' }}>
            Besplatna dostava u Bačkoj Palanci
          </Typography>
          <Typography sx={{ fontSize: isMobile ? 14 : 16 }}>
            Šaljemo brzom poštom — danas za sutra. Ukoliko želite veće količine ili ste pravno lice slobodno nas{' '}
            <b style={{ color: '#1a3a82' }}>Kontaktirajte.</b>
          </Typography>
        </Box>
      </Box>
    </Box>
    {showCart && (
            <Link to="/cart" className="customLink" style={{ color: 'inherit' }}>
  <Box
    sx={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      borderRadius: '50%',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      p: 1.5,
      cursor: 'pointer',
      zIndex: 2000,
      transition: 'transform 0.3s ease',
      '&:hover': { transform: 'scale(1.1)' },
    }}
  >
    <Badge badgeContent={totalItemsInCart} color="error">

        <ShoppingCart />

    </Badge>
  </Box>      </Link>
)}
</>
  );
}