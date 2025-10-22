import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import folija25 from './img/folija25.png';
import folija5 from './img/folija5.png';

const products = [
  { id: 1, name: 'Streč folija ručna, 2.5kg', price: '2.060 RSD', img: folija25 },
  { id: 2, name: 'Streč folija ručna, 5kg', price: '3.250 RSD', img: folija5 },
];

export default function Products() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 6,
        mt: 4,
        flexWrap: 'wrap',
      }}
    >
      {products.map((p) => (
        <Box
          key={p.id}
          sx={{
            width: 250,
            textAlign: 'center',
            p: 2,
            position: 'relative',
            '& img': {
              transition: 'transform 0.3s ease',
            },
            '&:hover img': {
              transform: 'scale(1.05)',
            },
            '&:hover button': {
              opacity: 1,
              visibility: 'visible',
            },
          }}
        >
          <Box sx={{ mb: 1 }}>
            <img
              src={p.img}
              alt={p.name}
              style={{ width: '100%', height: 'auto', borderRadius: 4 }}
            />
          </Box>

          <Typography sx={{ color: 'gray', fontSize: 13 }}>STREČ FOLIJE</Typography>
          <Typography sx={{ fontSize: 15 }}>{p.name}</Typography>
          <Typography sx={{ fontWeight: 'bold', mt: 1 }}>{p.price}</Typography>

          <Button
            variant="contained"
            sx={{
              mt: 1,
              bgcolor: 'black',
              color: 'white',
              opacity: 0,
              visibility: 'hidden',
              transition: 'opacity 0.3s ease, visibility 0.3s ease',
            }}
          >
            Dodaj u korpu
          </Button>
        </Box>
      ))}
    </Box>
  );
}