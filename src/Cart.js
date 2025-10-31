// src/Cart.js
import React from 'react';
import { Box, Typography, Button, Divider, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from './CartContext'; // Adjust path if needed

// Helper to format the number back to RSD display format
const formatPrice = (price) => `${price.toLocaleString('sr-RS')} RSD`;

export default function Cart() {
  const { cartItems, cartTotal, addToCart, decreaseQuantity, removeFromCart } = useCart();

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4, px: 2, marginBottom: '50vw' }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          mb: 4,
          color: '#0f2352',
        }}
      >
        Vaša Korpa
      </Typography>

      {/* Cart Content */}
      {cartItems.length === 0 ? (
        <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mt: 5 }}>
          Vaša korpa je prazna.
        </Typography>
      ) : (
        <Box>
          {/* List of Items */}
          {cartItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                mb: 2,
                border: '1px solid #eee',
                borderRadius: 2,
                bgcolor: 'white',
              }}
            >
              {/* Product Info (Left) */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: 60, height: 'auto', borderRadius: 4 }}
                />
                <Box>
                  <Typography fontWeight="bold">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.priceDisplay} po komadu
                  </Typography>
                </Box>
              </Box>

              {/* Quantity Controls (Middle) */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #ccc',
                  borderRadius: 1,
                }}
              >
                <IconButton size="small" onClick={() => decreaseQuantity(item.id)}>
                  <RemoveIcon fontSize="inherit" />
                </IconButton>
                <Typography sx={{ px: 1 }}>{item.quantity}</Typography>
                <IconButton size="small" onClick={() => addToCart(item)}>
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </Box>

              {/* Subtotal and Remove (Right) */}
              <Box sx={{ textAlign: 'right' }}>
                <Typography fontWeight="bold" color="#0f2352">
                  {formatPrice(item.price * item.quantity)}
                </Typography>
                <IconButton size="small" color="error" onClick={() => removeFromCart(item.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}

          {/* Cart Summary */}
          <Divider sx={{ my: 3 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'normal' }}>
              UKUPNO:
            </Typography>
            <Typography variant="h5" color="error" sx={{ fontWeight: 'bold' }}>
              {formatPrice(cartTotal)}
            </Typography>
          </Box>

          {/* Checkout Button */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              bgcolor: '#0f2352',
              '&:hover': { bgcolor: '#173272' },
            }}
            onClick={() => alert('Stranica za porucivanje je u izradi.')}
          >
            Nastavi na porudžbinu
          </Button>
        </Box>
      )}
    </Box>
  );
}