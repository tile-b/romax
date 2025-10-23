import { Box, Typography, useTheme, useMediaQuery, Badge } from '@mui/material'; // Import Badge
import { LocationOn, ShoppingCart } from '@mui/icons-material';
import logo from './img/romaxLogo.png';
import { useCart } from './CartContext'; // <-- 1. IMPORT THE HOOK
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function TopBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { totalItemsInCart } = useCart();

  const [showCart, setShowCart] = useState(false);

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
              <LocationOn />
              <Typography sx={{ fontSize: 14 }}>Lokacija</Typography>
            </Box>

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
  <Link to="/cart" className='customLink'>
                <ShoppingCart />
                </Link>
              </Badge>
              <Typography sx={{ fontSize: 14 }}>Korpa</Typography>
            </Box>
          </Box>
        </Box>
        {/* END: New Wrapper */}

        {/* Right - Info box */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            px: 2,
            py: 0.5,
            borderRadius: 1,
            maxWidth: 380,
            fontSize: 19,
            // mt: isMobile ? 2 : 0, // No longer needed, parent 'gap' handles this
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
      <Link to="/cart" className="customLink" style={{ color: 'inherit' }}>
        <ShoppingCart />
      </Link>
    </Badge>
  </Box>
)}
</>
  );
}