import React from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import { Facebook, Instagram, MailOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>  

      <Box
      component="footer"
      sx={{
        backgroundColor: '#1a2b4c', // deep blue tone matching your site
        color: 'white',
        py: 4,
        px: { xs: 2, md: 6 },
        textAlign: 'center',
      }}
    >
      {/* Links */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
          flexWrap: 'wrap',
          mb: 2,
        }}
      >
        <Link to="/about" className='customLink'>
          O nama
        </Link>
        <Link to="/" className='customLink'>
          Proizvodi
        </Link>
        <Link to="/contact" className='customLink'>
          Kontakt
        </Link>
      </Box>

      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', mb: 2 }} />

      {/* Social Icons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
        <IconButton
          href="https://facebook.com"
          target="_blank"
          sx={{ color: 'white', '&:hover': { color: '#64b5f6', transform: 'scale(1.1)' } }}
        >
          <Facebook />
        </IconButton>
        <IconButton
          href="https://instagram.com"
          target="_blank"
          sx={{ color: 'white', '&:hover': { color: '#64b5f6', transform: 'scale(1.1)' } }}
        >
          <Instagram />
        </IconButton>
        <IconButton
          href="mailto:office.romax@gmail.com"
          sx={{ color: 'white', '&:hover': { color: '#64b5f6', transform: 'scale(1.1)' } }}
        >
          <MailOutline />
        </IconButton>
      </Box>

      {/* Copyright */}
      <Typography variant="body2" sx={{ opacity: 0.7 }}>
        © {new Date().getFullYear()} Romax. Sva prava zadrzana.
      </Typography>
    </Box>
    </>

  );
}
