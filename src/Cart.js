// src/Cart.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  Modal,
  TextField,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import emailjs from 'emailjs-com';
import { useCart } from './CartContext';

// Helper to format number
const formatPrice = (price) => `${price.toLocaleString('sr-RS')} RSD`;

export default function Cart() {
  const { cartItems, cartTotal, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    note: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Vaša korpa je prazna!');
      return;
    }

    const orderDetails = cartItems
      .map((item) => `${item.name} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}`)
      .join('\n');

    const templateParams = {
      from_name: formData.name,
      from_surname: formData.surname,
      from_email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      message: formData.note || 'Nema dodatne napomene',
      total: formatPrice(cartTotal),
      items: orderDetails,
    };

    emailjs
      .send(
        'service_sxrh9dj', // ← replace
        'template_hp9m2y7', // ← replace
        templateParams,
        'mmP_KhT6MbA-8nmif' // ← replace
      )
      .then(() => {
        alert('Porudžbina uspešno poslata! Bicete kontaktirani od strane nas u najkracem roku!');
        setOpen(false);
        setFormData({
          name: '',
          surname: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          note: '',
        });
        clearCart(); // clear cart after successful order
      })
      .catch((error) => {
        alert('Došlo je do greške prilikom slanja porudžbine.');
        console.error('EmailJS error:', error);
      });
  };

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

      {cartItems.length === 0 ? (
        <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mt: 5 }}>
          Vaša korpa je prazna.
        </Typography>
      ) : (
        <Box>
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

          <Divider sx={{ my: 3 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4 }}>
            <Typography variant="h6">UKUPNO:</Typography>
            <Typography variant="h5" color="error" sx={{ fontWeight: 'bold' }}>
              {formatPrice(cartTotal)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3, bgcolor: '#0f2352', '&:hover': { bgcolor: '#173272' } }}
            onClick={() => setOpen(true)}
          >
            Nastavi na porudžbinu
          </Button>
        </Box>
      )}

      {/* Modal za porudžbinu */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            maxWidth: 400,
            bgcolor: 'white',
            borderRadius: 2,
            p: 4,
            mx: 'auto',
            mt: '15vh',
            boxShadow: 5,
          }}
          component="form"
          onSubmit={handleSendEmail}
        >
          <Typography variant="h6" fontWeight="bold" mb={2} color="#0f2352">
            Unesite podatke za porudžbinu
          </Typography>

          <TextField
            fullWidth
            label="Ime"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Prezime"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Telefon"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Adresa"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Mesto stanovanja"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Napomena (opciono)"
            name="note"
            value={formData.note}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Ukupno:</strong> {formatPrice(cartTotal)}
          </Typography>

          <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#0f2352' }}>
            Pošalji porudžbinu
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
