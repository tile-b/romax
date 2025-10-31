import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DiscountIcon from '@mui/icons-material/Discount';
import { useTheme, useMediaQuery } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

export default function About() {

    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    { icon: <LocalShippingIcon />, text: 'Brza isporuka širom Srbije' },
    { icon: <StorefrontIcon />, text: 'Kupovina na veliko i malo' },
    { icon: <DiscountIcon />, text: 'Povoljne cene i popusti' },
  ];
  
  return (
    <Box
      sx={{
        backgroundColor: '#f5f7fa',
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 8 },
      }}
    >
      {/* Naslov */}
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          color: '#1a2b4c',
          fontWeight: 700,
          mb: 3,
          fontSize: { xs: '1.9rem', md: '2.6rem' },
        }}
      >
        Romax Plus DOO – Vaš pouzdan proizvođač i distributer streč folije
      </Typography>

      {/* Uvodni opis */}
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          color: '#444',
          maxWidth: 900,
          mx: 'auto',
          lineHeight: 1.8,
          mb: 5,
          fontSize: { xs: '1rem', md: '1.15rem' },
        }}
      >
         Romax Plus DOO iz Bačke Palanke – firma specijalizovana za proizvodnju,
        konfekcioniranje i prodaju streč folije. Naša folija je izdržljiva, elastična i ekonomična,
        idealna za industrijsku upotrebu, logistiku, magacine i domaćinstva.
        U ponudi imamo streč foliju od 5 kg i 2,5 kg, izrađenu od kvalitetnog materijala koji
        obezbeđuje sigurno pakovanje i zaštitu robe.
      </Typography>

      {/* Prednosti */}
{/* Prednosti */}
<Grid
      container
      // Decrease spacing to save horizontal room
      spacing={isMobile ? 1 : 3} 
      justifyContent="center"
      sx={{
        mb: isMobile ? 4 : 8,
        // Reduce horizontal padding on mobile
        px: isMobile ? 1 : 6, 
      }}
    >
      {features.map((item, i) => (
        // *** CHANGE 1: Use xs={4} to force 3 cards per row (4+4+4 = 12 columns) ***
        <Grid item xs={4} sm={6} md={4} key={i}>
          <Card
            sx={{
              textAlign: 'center',
              // Reduce vertical padding to make cards smaller
              py: isMobile ? 1 : 4, 
              // Reduce horizontal padding within the card
              px: isMobile ? 0.5 : 2, 
              borderRadius: 3,
              backgroundColor: 'white',
              boxShadow: 3,
            }}
          >
            <Box
              sx={{
                color: '#1a3a82',
                mb: isMobile ? 0.5 : 1,
              }}
            >
              {React.cloneElement(item.icon, {
                // *** CHANGE 2: Aggressively reduce icon size on mobile ***
                sx: { fontSize: isMobile ? 25 : 50 }, 
              })}
            </Box>

            <Typography
              variant={isMobile ? 'body2' : 'h6'}
              sx={{
                fontWeight: 600,
                // *** CHANGE 3: Set a very small fixed font size for mobile ***
                fontSize: isMobile ? '0.65rem' : '1.1rem', 
                // Ensure text doesn't wrap to a second line if possible
                lineHeight: 1.1,
              }}
            >
              {item.text}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>


      {/* O nama */}
      <Typography
        variant="h5"
        sx={{
          color: '#1a2b4c',
          fontWeight: 700,
          mb: 2,
          textAlign: 'center',
        }}
      >
        🏭 O nama
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#444',
          maxWidth: 900,
          mx: 'auto',
          lineHeight: 1.8,
          mb: 5,
          fontSize: { xs: '1rem', md: '1.15rem' },
          textAlign: 'center',
        }}
      >
        Romax Plus DOO je domaća firma sa sedištem u Bačkoj Palanci, u ulici Marije Bursać 13.
        Naša misija je da ponudimo pouzdan, pristupačan i kvalitetan proizvod koji zadovoljava
        potrebe modernog tržišta pakovanja. Kombinujemo iskustvo, preciznost i savremenu
        tehnologiju u procesu premotavanja streč folije, čime garantujemo ujednačen kvalitet
        i tačnu težinu svake rolne. Posebnu pažnju posvećujemo saradnji sa pravnim licima –
        firmama koje svakodnevno koriste foliju u proizvodnji i transportu.
        <br />
        <br />
        📄 <strong>PIB:</strong> 00  <strong>Matični broj:</strong> 00
      </Typography>

      {/* Naši proizvodi */}
      <Typography
        variant="h5"
        sx={{
          color: '#1a2b4c',
          fontWeight: 700,
          mb: 3,
          textAlign: 'center',
        }}
      >
        📦 Naši proizvodi
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
        {[
          {
            title: 'Streč folija 5 kg',
            desc: 'Profesionalna folija za mašinsko i ručno pakovanje. Idealna za proizvodne pogone, distributivne centre i magacine. Odlikuje se visokom elastičnošću i otpornosti na pucanje.',
          },
          {
            title: 'Streč folija 2,5 kg',
            desc: 'Kompaktna i praktična varijanta namenjena manjim korisnicima i domaćinstvima. Omogućava brzo i sigurno pakovanje raznovrsnih proizvoda.',
          },
        ].map((item, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Card
              sx={{
                backgroundColor: 'white',
                borderRadius: 3,
                boxShadow: 4,
                height: '100%',
                '&:hover': { transform: 'scale(1.02)', transition: '0.3s' },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: '#1a3a82', fontWeight: 700, mb: 1 }}
                >
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.6 }}>
                  {item.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Zašto Romax */}
      <Typography
        variant="h5"
        sx={{
          color: '#1a2b4c',
          fontWeight: 700,
          mb: 3,
          textAlign: 'center',
        }}
      >
        💡 Zašto baš Romax Plus?
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {[
          { icon: <VerifiedIcon />, text: 'Kvalitetna sirovina i precizna izrada' },
          { icon: <PrecisionManufacturingIcon />, text: 'Stabilna debljina i elastičnost folije' },
          { icon: <LocalShippingIcon />, text: 'Brza isporuka i fleksibilnost prema kupcima' },
          { icon: <PriceCheckIcon />, text: 'Najbolji odnos cene i kvaliteta na tržištu' },
          { icon: <ThumbUpIcon />, text: 'Popusti i pogodnosti za firme i distributere' },
        ].map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                borderRadius: 3,
                backgroundColor: 'white',
                boxShadow: 3,
              }}
            >
              <Box sx={{ color: '#1a3a82', mr: 2 }}>{item.icon}</Box>
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>
                {item.text}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
