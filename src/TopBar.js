import React from 'react';
import { Box, useTheme, useMediaQuery, Badge } from '@mui/material'; // Import Badge
import { ShoppingCart } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import MenuIcon from '@mui/icons-material/Menu';
import logo from './img/romaxLogo.png';
import doc from './img/strec.png';
import { useCart } from './CartContext'; // <-- 1. IMPORT THE HOOK
import { Link, useLocation } from 'react-router-dom';
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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { totalItemsInCart } = useCart();

  const location = useLocation();
  const isCartPage = location.pathname === '/cart';

  const [showCart, setShowCart] = useState(false);

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>

        <ListItem disablePadding>
          <Link to="/about" className='customLink'>
            <ListItemButton>
              <ListItemIcon sx={{ color: 'white', minWidth: 50, '& svg': { fontSize: 30 } }}>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText
                primary="O Nama"
                primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.3rem' }}
              />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <Link to="/" className='customLink'>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 50 }}>
                <img src={doc} alt="P" style={{ height: 32, opacity: 0.8 }} />
              </ListItemIcon>
              <ListItemText
                primary="Proizvodi"
                primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.3rem' }}
              />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <Link to="/contact" className='customLink'>
            <ListItemButton>
              <ListItemIcon sx={{ color: 'white', minWidth: 50, '& svg': { fontSize: 30 } }}>
                <ContactPhoneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Kontakt"
                primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.3rem' }}
              />
            </ListItemButton>
          </Link>
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
          px: 2,
          py: 1,
          bgcolor: 'transparent',
          position: 'relative',

          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #001788, #1a3a82, #001788, transparent)',
            backgroundSize: '200% 100%',
            animation: 'gradientShift 4s ease infinite',
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
              {/* Cart */}
              {!isCartPage && (
                <Link to="/cart" className='customLink'>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#1a3a82',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Badge
                      badgeContent={totalItemsInCart}
                      color="error"
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      sx={{
                        '& .MuiBadge-badge': {
                          animation: totalItemsInCart > 0 ? 'pulse 2s ease-in-out infinite' : 'none',
                          right: -12,
                          top: -9,
                        },
                      }}
                    >
                      <ShoppingCart />
                    </Badge>
                  </Box>
                </Link>
              )}

              {isMobile ? (
                <>
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
                      }
                    }}
                  >
                    {DrawerList}
                  </Drawer> </>) : (<Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4, // space between buttons
                    }}
                  >
                    <Link to="/about" className="customLink">
                      <Button
                        sx={{
                          color: '#001788',
                          fontWeight: 'bold',
                          fontSize: '1.4rem',
                          textTransform: 'none',
                          position: 'relative',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: '#1a3a82',
                            transform: 'translateY(-2px)',
                          },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '0%',
                            height: '2px',
                            background: 'linear-gradient(90deg, #001788, #1a3a82)',
                            transition: 'width 0.3s ease',
                          },
                          '&:hover::after': {
                            width: '100%',
                          },
                        }}
                      >
                        O Nama
                      </Button>
                    </Link>

                    <Link to="/" className="customLink">
                      <Button
                        sx={{
                          color: '#001788',
                          fontWeight: 'bold',
                          fontSize: '1.4rem',
                          textTransform: 'none',
                          position: 'relative',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: '#1a3a82',
                            transform: 'translateY(-2px)',
                          },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '0%',
                            height: '2px',
                            background: 'linear-gradient(90deg, #001788, #1a3a82)',
                            transition: 'width 0.3s ease',
                          },
                          '&:hover::after': {
                            width: '100%',
                          },
                        }}
                      >
                        Proizvodi
                      </Button>
                    </Link>

                    <Link to="/contact" className="customLink">
                      <Button
                        sx={{
                          color: '#001788',
                          fontWeight: 'bold',
                          fontSize: '1.4rem',
                          textTransform: 'none',
                          position: 'relative',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: '#1a3a82',
                            transform: 'translateY(-2px)',
                          },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '0%',
                            height: '2px',
                            background: 'linear-gradient(90deg, #001788, #1a3a82)',
                            transition: 'width 0.3s ease',
                          },
                          '&:hover::after': {
                            width: '100%',
                          },
                        }}
                      >
                        Kontakt
                      </Button>
                    </Link>
                  </Box>)}
            </Box>
          </Box>
          {/* END: New Wrapper */}

        </Box>
      </Box>
      {showCart && !isCartPage && (
        <Link to="/cart" className="customLink" style={{ color: 'inherit' }}>
          <Box
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              borderRadius: '50%',
              boxShadow: '0px 8px 24px rgba(15, 35, 82, 0.3)',
              p: 1.5,
              cursor: 'pointer',
              zIndex: 2000,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.15) translateY(-4px)',
                boxShadow: '0px 12px 32px rgba(15, 35, 82, 0.4)',
              },
              bgcolor: '#ffffff',
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            <Badge
              badgeContent={totalItemsInCart}
              color="error"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{
                '& .MuiBadge-badge': {
                  animation: 'pulse 2s ease-in-out infinite',
                  right: -12,
                  top: -9,
                },
              }}
            >
              <ShoppingCart />
            </Badge>
          </Box>      </Link>
      )}
    </>
  );
}