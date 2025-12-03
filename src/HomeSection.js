import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import stretchImg from './img/fol.jpg'; // zameni sa svojom slikom
import { Link } from 'react-router-dom';

export default function HomeSection() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #f5f7fa 0%, #e8eef5 100%)',
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 8 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* Naslov i opis */}
      <Typography
        variant="h4"
        sx={{
          background: 'linear-gradient(135deg, #1a2b4c 0%, #1a3a82 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 700,
          mb: 2,
          animation: 'fadeIn 0.8s ease',
        }}
      >
        Svojstva naših streč folija
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'rgba(68, 68, 68, 0.7)',
          lineHeight: 1.7,
          maxWidth: 800,
          mb: 4,
          animation: 'slideUp 0.8s ease 0.2s backwards',
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
          { title: 'Debljina', desc: '23 mikrona' },
          { title: 'Širina rolne', desc: '500 mm' },
          { title: 'Boja', desc: 'Providna' },
          { title: 'Zatezna čvrstoća', desc: 'Izuzetno visoka' },
        ].map((item, i) => (
          <Grid
            item
            xs={6}
            sm={3}
            key={i}
            sx={{
              animation: 'scaleIn 0.5s ease backwards',
              animationDelay: `${i * 0.1 + 0.4}s`,
            }}
          >
            <Card
              sx={{
                background: 'linear-gradient(135deg, #1a2b4c 0%, #1a3a82 100%)',
                color: 'white',
                borderRadius: 2,
                boxShadow: '0 8px 24px rgba(26, 43, 76, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px) rotateY(5deg)',
                  boxShadow: '0 12px 32px rgba(26, 43, 76, 0.4)',
                },
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
          boxShadow: '0 12px 40px rgba(15, 35, 82, 0.2)',
          transition: 'all 0.4s ease',
          animation: 'fadeIn 1s ease 0.8s backwards',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 16px 56px rgba(15, 35, 82, 0.3)',
          },
        }}
      />

      {/* Dugme */}
      <Link to="/about" className='customLink'>
        <Button
          variant="contained"
          sx={{
            mt: 4,
            background: 'linear-gradient(135deg, #1a3a82 0%, #244c9e 100%)',
            fontWeight: 600,
            px: 4,
            py: 1,
            borderRadius: 3,
            boxShadow: '0 4px 14px rgba(26, 58, 130, 0.3)',
            transition: 'all 0.3s ease',
            animation: 'slideUp 1s ease 1s backwards',
            '&:hover': {
              background: 'linear-gradient(135deg, #244c9e 0%, #2e5fc4 100%)',
              transform: 'translateY(-3px)',
              boxShadow: '0 8px 24px rgba(26, 58, 130, 0.4)',
            },
          }}
        >
          Detaljnije o nama
        </Button>
      </Link>
    </Box>
  );
}
