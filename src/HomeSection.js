import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import stretchImg from './img/fol.jpg'; // zameni sa svojom slikom
import { Link } from 'react-router-dom';

export default function HomeSection() {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f7fa',
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 8 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* Naslov i opis */}
      <Typography variant="h4" sx={{ color: '#1a2b4c', fontWeight: 700, mb: 2 }}>
        Svojstva naših streč folija
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'rgba(68, 68, 68, 0.7)',
          lineHeight: 1.7,
          maxWidth: 800,
          mb: 4,
        }}
      >
        Naše ručne streč folije namenjene su za brzo, jednostavno i efikasno pakovanje robe.
        Odlikuju se visokom elastičnošću, izuzetnom čvrstoćom i otpornošću na kidanje.
        Idealne su za zaštitu proizvoda tokom transporta i skladištenja.
      </Typography>

      {/* Osobine */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ maxWidth: 800, mb: 5 }}
      >
        {[
          { title: 'Debljina', desc: '15 – 23 mikrona' },
          { title: 'Širina rolne', desc: '500 mm' },
          { title: 'Boja', desc: 'Providna ili crna' },
          { title: 'Zatezna čvrstoća', desc: 'Izuzetno visoka' },
        ].map((item, i) => (
          <Grid item xs={6} sm={3} key={i}>
            <Card
              sx={{
                backgroundColor: '#1a2b4c',
                color: 'white',
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Slika */}
      <Box
        component="img"
        src={stretchImg}
        alt="Ručna streč folija"
        sx={{
          width: '100%',
          maxWidth: 500,
          borderRadius: 3,
          boxShadow: 4,
        }}
      />

      {/* Dugme */}
      <Link to="/about" className='customLink'>
      <Button
        variant="contained"
        sx={{
          mt: 4,
          backgroundColor: '#1a3a82',
          fontWeight: 600,
          px: 4,
          py: 1,
          borderRadius: 3,
          '&:hover': { backgroundColor: '#244c9e' },
        }}
      >
        Detaljnije o nama
      </Button>
      </Link>
    </Box>
  );
}
