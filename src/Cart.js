import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Button, Paper, Divider, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Snackbar, Alert } from '@mui/material';
// ISPRAVLJENO: Uklonjen duplirani '@mui'
import AddIcon from '@mui/icons-material/Add'; 
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useCart } from './CartContext';
import productsData from './productsData';
import emailjs from '@emailjs/browser';

// Reusing your existing logic for price calculation, but moved out for cleanliness
// NOTE: Make sure productsData is correctly imported and accessible for price range lookups
// NOTE: The getPrice function logic is kept as is from your original component
const getPrice = (product, quantity) => {
    // First try product.priceRanges on the cart item
    const ranges = product && Array.isArray(product.priceRanges) ? product.priceRanges : null;
    // If not present, lookup canonical product data by id
    const canonical = productsData.find(p => p.id === product.id);
    const effectiveRanges = ranges || (canonical ? canonical.priceRanges : null);

    if (effectiveRanges && Array.isArray(effectiveRanges)) {
      const range = effectiveRanges.find(r => quantity >= r.min && quantity <= r.max);
      if (range) return range.price;
      return effectiveRanges[0] ? effectiveRanges[0].price : (product && typeof product.price === 'number' ? product.price : 0);
    }

    // Last fallback: use stored item price
    return product && typeof product.price === 'number' ? product.price : 0;
};

// Format price with dot as thousands separator, e.g. 1000 -> 1.000
const formatPrice = (value) => {
  const n = Number(value) || 0;
  return new Intl.NumberFormat('de-DE').format(n) + ' RSD';
};

// Item component for visual clarity and reusability
const CartItem = ({ item, handleIncrement, handleDecrement, removeFromCart, onQuantityChange }) => {
  const canonicalImg = productsData.find(p => p.id === item.id)?.img;
  const finalImg = item.img || canonicalImg;

  const [inputQty, setInputQty] = useState(item.quantity);

  useEffect(() => {
    setInputQty(item.quantity);
  }, [item.quantity]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val === '') { setInputQty(''); return; }
    const num = Number(val);
    if (Number.isNaN(num) || num < 1) { setInputQty(val); return; }
    setInputQty(num);
    onQuantityChange(item, num);
  };

  const handleBlur = () => {
    if (inputQty === '' || Number(inputQty) < 1) {
      setInputQty(item.quantity);
      return;
    }
    onQuantityChange(item, Number(inputQty));
  };

  return (
    <Paper elevation={1} sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 2, bgcolor: 'white', borderRadius: 2 }}>
      <img 
        src={finalImg} 
        alt={item.name} 
        style={{ 
          width: 80, 
          height: 80, 
          objectFit: 'cover', 
          borderRadius: 6, 
          marginRight: 16 
        }} 
      />
            
      <Grid container spacing={1} alignItems="center">
                
        {/* Product Name & Current Price */}
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#0f2352' }}>{item.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Cena po komadu: <span style={{ fontWeight: 'bold' }}>{formatPrice(item.price)}</span>
          </Typography>
        </Grid>

        {/* Quantity Controls with editable input */}
        <Grid item xs={6} sm={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'center' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: 1, px: 1 }}>
            <IconButton size="small" onClick={() => handleDecrement(item)} disabled={item.quantity <= 1}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <input
              type="number"
              min={1}
              value={inputQty}
              onChange={handleInputChange}
              onBlur={handleBlur}
              style={{ width: 56, textAlign: 'center', border: 'none', outline: 'none', background: 'transparent', fontWeight: 'bold' }}
            />
            <IconButton size="small" onClick={() => handleIncrement(item)}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>

        {/* Total Price & Delete Button */}
        <Grid item xs={6} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black', mr: 2, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            {formatPrice(item.price * item.quantity)}
          </Typography>
          <IconButton color="error" onClick={() => removeFromCart(item.id)} size="medium">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};


export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  // Constants
  const transportFee = 400;
  const grandTotal = cartTotal + transportFee;

  // Handlers (reusing logic but updating getPrice reference)
  const handleIncrement = (product) => {
    const newQty = product.quantity + 1;
    const newPrice = getPrice(product, newQty);
    updateQuantity(product.id, newQty, newPrice);
  };

  const handleDecrement = (product) => {
    if (product.quantity <= 1) return;
    const newQty = product.quantity - 1;
    const newPrice = getPrice(product, newQty);
    updateQuantity(product.id, newQty, newPrice);
  };

  const handleQuantityChange = (product, newQty) => {
    const qty = Number(newQty) || 1;
    const newPrice = getPrice(product, qty);
    updateQuantity(product.id, qty, newPrice);
  };

  // Order modal state
  const [orderOpen, setOrderOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [snack, setSnack] = useState({ open: false, severity: 'success', message: '' });

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    note: '',
  });

  const openOrder = () => setOrderOpen(true);
  const closeOrder = () => setOrderOpen(false);

  const handleFormChange = (key) => (e) => setFormData(prev => ({ ...prev, [key]: e.target.value }));

  const buildOrderDetails = () => {
    return cartItems.map(i => `${i.name} — ${i.quantity} × ${formatPrice(i.price)} = ${formatPrice(i.price * i.quantity)}`).join('\n');
  };

  const sendOrder = async () => {
    // basic validation
    if (!formData.name || !formData.surname || !formData.address || !formData.city || !formData.phone || !formData.email) {
      setSnack({ open: true, severity: 'error', message: 'Molimo popunite sva obavezna polja.' });
      return;
    }

    setSending(true);

    const orderDetails = buildOrderDetails();
    const templateParams = {
      from_name: formData.name,
      from_surname: formData.surname,
      from_email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      message: formData.note || 'Nema dodatne napomene',
      total: formatPrice(grandTotal),
      items: orderDetails,
    };

    try {
      await emailjs.send(
        'service_sxrh9dj',
        'template_hp9m2y7',
        templateParams,
        'mmP_KhT6MbA-8nmif'
      );
      setSnack({ open: true, severity: 'success', message: 'Porudžbina poslata. Hvala!' });
      setOrderOpen(false);
      // clear cart after successful order
      try {
        clearCart();
      } catch (e) {
        // ignore
      }
      // reset form
      setFormData({ name: '', surname: '', address: '', city: '', phone: '', email: '', note: '' });
      // optionally clear cart or leave as-is
    } catch (err) {
      console.error('Email send error', err);
      setSnack({ open: true, severity: 'error', message: 'Slanje porudžbine nije uspelo. Pokušajte ponovo.' });
    } finally {
      setSending(false);
    }
  };

  // --- RENDERING ---
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 6, px: { xs: 2, md: 4 }, bgcolor: '#f4f7f9' }}>
      <Typography 
        variant="h4" 
        sx={{ 
          textAlign: 'center', 
          fontWeight: 'extraBold', 
          mb: 5, 
          color: '#0f2352', 
          borderBottom: '3px solid #0f2352', 
          display: 'inline-block', 
          mx: 'auto' 
        }}
      >
        <ShoppingCartIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Vaša Korpa
      </Typography>

      {cartItems.length === 0 ? (
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', mt: 5, bgcolor: 'white' }}>
          <Typography variant="h5" color="text.secondary">
            Vaša korpa je prazna.
          </Typography>
          <Button variant="contained" sx={{ mt: 3, bgcolor: '#0f2352', '&:hover': { bgcolor: '#173272' } }}>
            Nastavi kupovinu
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {/* LEFT SIDE: Cart Items List (8/12 columns on desktop) */}
          <Grid item xs={12} md={8}>
            <Box>
              {cartItems.map((item) => (
                <CartItem 
                    key={item.id}
                    item={item}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    removeFromCart={removeFromCart}
                    onQuantityChange={handleQuantityChange}
                />
              ))}
            </Box>
          </Grid>

          {/* RIGHT SIDE: Cart Summary (4/12 columns on desktop) */}
          <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{ p: 3, borderRadius: 3, position: { md: 'sticky' }, top: 20, bgcolor: '#ffffff' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#0f2352' }}>
                Sažetak Porudžbine
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {/* Subtotal */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1"><b>Proizvodi:</b></Typography>
             <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{formatPrice(cartTotal)}</Typography>
              </Box>

              {/* Transport Fee */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocalShippingIcon sx={{ fontSize: 18, mr: 0.5, color: 'success.main' }} /><b> Prevoz:</b>
             </Typography>
             <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{formatPrice(transportFee)}</Typography>
              </Box>
              
              <Divider sx={{ mb: 2 }} />

              {/* Grand Total */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Ukupno: </Typography>
             <Typography variant="h6" color="error" sx={{ fontWeight: 'bold' }}>{formatPrice(grandTotal)}</Typography>
              </Box>

              <Button 
                variant="contained" 
                fullWidth 
                size="large"
                onClick={openOrder}
                disabled={cartItems.length === 0}
                sx={{ 
                  bgcolor: '#0f2352', 
                  '&:hover': { bgcolor: '#173272' },
                  py: 1.5,
                  fontWeight: 'bold'
                }}
              >
                Nastavi na porudžbinu
              </Button>

              {/* Order Dialog - MODIFIED FOR MOBILE */}
              <Dialog open={orderOpen} onClose={closeOrder} fullWidth maxWidth="xs"> {/* Changed maxWidth to 'xs' */}
                <DialogTitle sx={{ typography: 'h6' }}>Podaci za porudžbinu</DialogTitle> {/* Reduced title size */}
                <DialogContent>
                  <Stack spacing={1} sx={{ mt: 1 }}> {/* Reduced spacing */}
                    
                    {/* Ime & Prezime (ostaje upareno) */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}> 
                      <TextField label="Ime" value={formData.name} onChange={handleFormChange('name')} fullWidth size="small" /> 
                      <TextField label="Prezime" value={formData.surname} onChange={handleFormChange('surname')} fullWidth size="small" /> 
                    </Stack>
                    
                    {/* NOVI RED: Adresa & Grad (upareni) */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}> 
                      <TextField label="Adresa" value={formData.address} onChange={handleFormChange('address')} fullWidth size="small" /> 
                      <TextField label="Grad" value={formData.city} onChange={handleFormChange('city')} fullWidth size="small" /> 
                    </Stack>
                    
                    {/* NOVI RED: Telefon & E-mail (upareni) */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}> 
                      <TextField label="Telefon" value={formData.phone} onChange={handleFormChange('phone')} fullWidth size="small" /> 
                      <TextField label="E-mail" value={formData.email} onChange={handleFormChange('email')} fullWidth size="small" /> 
                    </Stack>

                    <TextField label="Napomena (opciono)" value={formData.note} onChange={handleFormChange('note')} fullWidth multiline rows={2} size="small" /> {/* Reduced rows and added size="small" */}

                    <Divider />

                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Detalji porudžbine</Typography> {/* Reduced typography size */}
                    <Box sx={{ maxHeight: 150, overflow: 'auto', bgcolor: '#fafafa', p: 1, borderRadius: 1 }}> {/* Reduced maxHeight */}
                      {cartItems.map(i => (
                        <Box key={i.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}> {/* Reduced mb */}
                          <Typography sx={{ fontSize: 12 }}>{i.name} × {i.quantity}</Typography> {/* Reduced font size */}
                          <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>{formatPrice(i.price * i.quantity)}</Typography> {/* Reduced font size */}
                        </Box>
                      ))}
                      <Divider sx={{ my: 1 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: 12 }}>Ukupno (bez prevoza)</Typography> {/* Reduced font size */}
                        <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>{formatPrice(cartTotal)}</Typography> {/* Reduced font size */}
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: 12 }}>Prevoz</Typography> {/* Reduced font size */}
                        <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>{formatPrice(transportFee)}</Typography> {/* Reduced font size */}
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 , border: '1px solid #ccc', p: 1}}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Ukupno sa prevozom</Typography> {/* Reduced typography size */}
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{formatPrice(grandTotal)}</Typography> {/* Reduced typography size */}
                      </Box>
                    </Box>
                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeOrder} size="small">Otkaži</Button> {/* Reduced button size */}
                  <Button onClick={sendOrder} variant="contained" disabled={sending} size="small" sx={{ bgcolor: '#0f2352', '&:hover': { bgcolor: '#173272' } }}>{sending ? 'Šaljem...' : 'Pošalji porudžbinu'}</Button> {/* Reduced button size */}
                </DialogActions>
              </Dialog>

              {/* Snack */}
              <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack(s => ({ ...s, open: false }))}>
                <Alert severity={snack.severity} onClose={() => setSnack(s => ({ ...s, open: false }))}>{snack.message}</Alert>
              </Snackbar>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}