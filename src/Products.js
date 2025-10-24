import { Box, Typography, Button } from '@mui/material';
import folija25 from './img/folija25.png';
import folija5 from './img/folija5.png';
import { useCart } from './CartContext'; // <-- 1. IMPORT THE HOOK

const products = [
{ id: 1, name: 'Streč folija ručna, 2.5kg', priceDisplay: '1.060 RSD', price: 1060, img: folija25 },
  { id: 2, name: 'Streč folija ručna, 5kg', priceDisplay: '1.650 RSD', price: 1650, img: folija5 },
];

export default function Products() {
  const { addToCart } = useCart(); // <-- 2. GET THE FUNCTION FROM CONTEXT

  return (
    <Box sx={{ py: 6 }}>
      {/* ... (your Typography components remain the same) ... */}
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          fontSize: 35,
          fontWeight: 'bold',
          mb: 1,
          color: '#0f2352',
        }}
      >
        Streč Folija
      </Typography>
      <Typography
        sx={{
          textAlign: 'center',
          color: 'gray',
          fontSize: 15,
          mb: 4,
        }}
      >
        Ručne streč folije visoke kvalitete — idealne za pakovanje i zaštitu robe.
      </Typography>

      <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    gap: { xs: 1, sm: 6 }, // smaller gap on narrow screens
    flexWrap: { xs: 'nowrap', sm: 'wrap' }, // don't wrap below 650px
    overflowX: { xs: 'auto', sm: 'visible' }, // enable horizontal scroll if needed
  }}
>
  {products.map((p) => (
    <Box
      key={p.id}
      sx={{
        width: { xs: 160, sm: 250 }, // smaller width on small screens
        flex: '0 0 auto', // prevents shrinking too much when nowrap
        textAlign: 'center',
        p: 1,
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        backgroundColor: 'white',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '& img': {
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        '&:hover img': {
          transform: 'scale(1.05)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
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
            <Typography sx={{ fontWeight: 'bold', mt: 1 }}>{p.priceDisplay}</Typography>

            <Button
              variant="contained"
              sx={{
                mt: 1,
                bgcolor: '#0f2352ff',
                color: 'white',
                '&:hover': {
                  bgcolor: '#173272ff',
                },
              }}
              onClick={() => addToCart(p)} // <-- 3. UPDATE ONCLICK
            >
              Dodaj u korpu
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}