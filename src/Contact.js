import React from 'react';
import { Box, Typography, Card, Grid, Link } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';

export default function Contact() {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f7fa',
        minHeight: '10vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, md: 4 },
        py: { xs: 6, md: 10 },
        marginBottom: 18,
        marginTop: 8,
      }}
    >
      <Card
        sx={{
          maxWidth: 900,
          width: '100%',
          borderRadius: 3,
          boxShadow: 6,
          backgroundColor: 'white',
          p: { xs: 3, md: 6 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#1a2b4c',
            fontWeight: 700,
            textAlign: 'center',
            mb: { xs: 3, md: 5 },
            fontSize: { xs: '1.9rem', md: '2.5rem' },
          }}
        >
          Kontakt
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#444',
            textAlign: 'center',
            lineHeight: 1.7,
            mb: { xs: 4, md: 6 },
            fontSize: { xs: '1rem', md: '1.2rem' },
            maxWidth: 700,
            mx: 'auto',
          }}
        >
          Za sve informacije o našim proizvodima i uslugama, kontaktirajte nas putem
          telefona ili email adrese. Naš tim će vam rado pomoći.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Firma */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <BusinessIcon sx={{ color: '#1a3a82', mr: 1.5 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Romax Plus
              </Typography>
            </Box>
            <Box sx={{ ml: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOnIcon sx={{ color: '#1a3a82', mr: 1 }} />
                <Typography variant="body1">
                  Marije Bursać 13, Bačka Palanka, Srbija 21400
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ ml: 4 }}>
                <strong>PIB:</strong> 0044
              </Typography>
              <Typography variant="body1" sx={{ ml: 4 }}>
                <strong>Matični broj:</strong> 00
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <EmailIcon sx={{ color: '#1a3a82', mr: 1 }} />
                <Link
                  href="mailto:office.romax@gmail.com"
                  underline="none"
                  sx={{ color: '#1a3a82', fontWeight: 600 }}
                >
                  office.romax@gmail.com
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Direktor i menadžer */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PersonIcon sx={{ color: '#1a3a82', mr: 1.5 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Kontakt osobe
              </Typography>
            </Box>

            <Box sx={{ ml: 4 }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Direktor: Nenad Knežević
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon sx={{ color: '#1a3a82', mr: 1 }} />
                <Link
                  href="tel:+381644095182"
                  underline="none"
                  sx={{ color: '#1a3a82', fontWeight: 500 }}
                >
                  +381 64 4095182
                </Link>
              </Box>

              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Menadžer prodaje: Dušan Boročki
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ color: '#1a3a82', mr: 1 }} />
                <Link
                  href="tel:+381616823247"
                  underline="none"
                  sx={{ color: '#1a3a82', fontWeight: 500 }}
                >
                  +381 61 6823247
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          sx={{
            mt: { xs: 5, md: 8 },
            textAlign: 'center',
            color: '#888',
            fontStyle: 'italic',
          }}
        >
          Hvala na interesovanju za naše proizvode i saradnju.
        </Typography>
      </Card>
    </Box>
  );
}
