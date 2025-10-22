import React from 'react';
import { Box, Typography } from '@mui/material';
import { LocationOn, ShoppingCart } from '@mui/icons-material';
import logo from './img/romaxLogo.png'; // adjust path if needed

export default function TopBar() {
  return (
<Box
  sx={{
    bgcolor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',  // keeps spacing even but not too wide
    maxWidth: 1200,                  // keeps layout centered
    mx: 'auto',                      // centers it horizontally
    px: 2,
    py: 1,
    gap: 4                           // optional fine-tuning of spacing
  }}
>

      {/* Left - Logo */}
      <img src={logo} alt="Logo" style={{ height: 250 }} />

{/* Middle - Icons with text underneath */}
<Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      transition: '0.3s',
      '&:hover': { color: '#1a3a82' } // gold/brown hover color
    }}
  >
    <LocationOn />
    <Typography sx={{ fontSize: 14 }}>Lokacije</Typography>
  </Box>

  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      transition: '0.3s',
      '&:hover': { color: '#1a3a82' }
    }}
  >
    <ShoppingCart />
    <Typography sx={{ fontSize: 14 }}>Korpa</Typography>
  </Box>
</Box>


      {/* Right - Info box */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: 2,
          py: 0.5,
          borderRadius: 1,
          maxWidth: 380,
          alignItems: 'center', 
          textAlign: 'center',
          fontSize: 19,
        }}
      >
        <Typography sx={{ color: 'red', fontWeight: 'bold', }}>
          Besplatna dostava u Bačkoj Palanci
        </Typography>
        <Typography >
          Saljemo brzom poštom - danas za sutra. Ukoliko želite veće količine ili ste pravno lice slobodno nas{' '}
          <b style={{ color: '#1a3a82' }}>
            Kontaktirajte
          </b>
        </Typography>
        {/* <Typography sx={{ fontSize: 13 }}>
          Telefoni: <a href="tel:0112545677">011/2545-677</a> ili{' '}
          <a href="tel:066370755">066/370-755</a>
        </Typography> */}
      </Box>
    </Box>
  );
}
