import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Snackbar, Alert, Card, CardContent, Grid, Divider, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useCart } from './CartContext';
import productsData from './productsData';

export default function Products() {
  const { addToCart, cartItems } = useCart();

  // Initialize quantities for all products
  const initialQuantities = {};
  productsData.forEach(p => initialQuantities[p.id] = 1);
  const [quantities, setQuantities] = useState(initialQuantities);

  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const getPrice = (product, quantity) => {
    // Find the range that covers the current quantity
    // If quantity > max defined range, use the last range (lowest price usually)
    // Actually the data has max: 30, but let's assume if > 30 it takes the best price or we cap it?
    // The original code used: quantity >= r.min && quantity <= r.max
    // If quantity is 31, it might fail if not handled. Let's make it robust.

    let range = product.priceRanges.find(r => quantity >= r.min && quantity <= r.max);
    if (!range) {
      // If not found, check if it's above the highest max
      const maxRange = product.priceRanges.reduce((prev, current) => (prev.max > current.max) ? prev : current);
      if (quantity > maxRange.max) {
        range = maxRange;
      } else {
        // Fallback to first
        range = product.priceRanges[0];
      }
    }
    return range ? range.price : product.priceRanges[0].price;
  };

  const handleChange = (id, val) => {
    const newQty = Math.max(1, Number(val));
    setQuantities(prev => ({ ...prev, [id]: newQty }));
  };

  const handleIncrement = (id) => handleChange(id, Number(quantities[id] || 1) + 1);
  const handleDecrement = (id) => handleChange(id, Math.max(1, Number(quantities[id] || 1) - 1));

  const orderProduct = (product) => {
    const qtyToAdd = Number(quantities[product.id]);

    // Check if item is already in cart to calculate correct bulk price
    const existingItem = cartItems.find(item => item.id === product.id);
    const currentCartQty = existingItem ? existingItem.quantity : 0;
    const newTotalQty = currentCartQty + qtyToAdd;

    // Calculate price based on the NEW total quantity
    const price = getPrice(product, newTotalQty);

    addToCart({ ...product, quantity: qtyToAdd, price });

    setNotificationMessage(`${product.name} (x${qtyToAdd}) je dodata u korpu!`);
    setOpenNotification(true);
  };

  return (
    <Box sx={{ py: 8, px: 2, backgroundColor: '#f8f9fa', minHeight: { xs: "100vh", md: "40vh" }, }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 800, mb: 2, color: '#0f2352' }}>
          Naša Ponuda
        </Typography>
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', fontSize: 18, mb: 6, maxWidth: 600, mx: 'auto' }}>
          Vrhunska streč folija za sigurno i efikasno pakovanje. <br />
          <span style={{ fontSize: '0.9em', opacity: 0.8 }}>Izaberite količinu da biste ostvarili popust.</span>
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {productsData.map((p) => {
            const qty = quantities[p.id] || 1;

            // Calculate price for display (just for the current selection)
            // Note: We show the price for the *selected* quantity, but when added it might be lower if they already have some.
            // To avoid confusion, we just show the price for the quantity they are selecting right now.
            const currentPrice = getPrice(p, qty);
            const totalPrice = qty * currentPrice;

            const inCartItem = cartItems.find(item => item.id === p.id);
            const inCartQty = inCartItem ? inCartItem.quantity : 0;

            return (
              <Grid item key={p.id} xs={12} md={6}>
                <Card
                  elevation={0}
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-4px)' },
                    height: '100%',
                    position: 'relative',
                    border: inCartQty > 0 ? '2px solid #4caf50' : 'none'
                  }}
                >
                  {inCartQty > 0 && (
                    <Chip
                      icon={<CheckCircleIcon style={{ color: 'white' }} />}
                      label={`U korpi: ${inCartQty} kom`}
                      sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        bgcolor: '#4caf50',
                        color: 'white',
                        fontWeight: 'bold',
                        zIndex: 2
                      }}
                    />
                  )}

                  {/* Image Section */}
                  <Box sx={{
                    width: { xs: '100%', sm: '40%' },
                    bgcolor: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    borderRight: { sm: '1px solid #eee' },
                    borderBottom: { xs: '1px solid #eee', sm: 'none' }
                  }}>
                    <img
                      src={p.img}
                      alt={p.name}
                      style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain' }}
                    />
                  </Box>

                  {/* Content Section */}
                  <CardContent sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom color="#0f2352">
                      {p.name}
                    </Typography>

                    {/* Price Tiers Visualizer */}
                    <Box sx={{ mb: 3, mt: 1 }}>
                      <Typography variant="caption" color="text.secondary" fontWeight="bold" textTransform="uppercase" letterSpacing={1}>
                        Cenovnik (klikni za odabir)
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                        {p.priceRanges.map((range, idx) => {
                          const isActive = qty >= range.min && qty <= range.max;
                          return (
                            <Box
                              key={idx}
                              onClick={() => handleChange(p.id, range.min)}
                              sx={{
                                border: isActive ? '2px solid #0f2352' : '1px solid #e0e0e0',
                                bgcolor: isActive ? '#eef2ff' : 'transparent',
                                borderRadius: 2,
                                px: 1.5, py: 0.5,
                                textAlign: 'center',
                                minWidth: 60,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': {
                                  borderColor: '#0f2352',
                                  bgcolor: isActive ? '#eef2ff' : '#f5f5f5'
                                }
                              }}
                            >
                              <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                {range.min}-{range.max} kom
                              </Typography>
                              <Typography variant="body2" fontWeight="bold" color={isActive ? '#0f2352' : 'text.primary'}>
                                {range.price} RSD
                              </Typography>
                            </Box>
                          )
                        })}
                      </Box>
                    </Box>

                    <Divider sx={{ my: 'auto' }} />

                    {/* Controls */}
                    <Box sx={{ mt: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 3, bgcolor: '#fff' }}>
                          <IconButton onClick={() => handleDecrement(p.id)} color="primary">
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ mx: 2, fontWeight: 'bold', minWidth: 20, textAlign: 'center' }}>{qty}</Typography>
                          <IconButton onClick={() => handleIncrement(p.id)} color="primary">
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="caption" color="text.secondary">Ukupno</Typography>
                          <Typography variant="h6" fontWeight="bold" color="#0f2352">
                            {totalPrice.toLocaleString()} RSD
                          </Typography>
                        </Box>
                      </Box>

                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => orderProduct(p)}
                        sx={{
                          bgcolor: '#0f2352',
                          borderRadius: 3,
                          py: 1.5,
                          textTransform: 'none',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          '&:hover': { bgcolor: '#1a3b80' }
                        }}
                      >
                        Dodaj u korpu
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Alert severity="info" sx={{ display: 'inline-flex', maxWidth: 600, mx: 'auto' }}>
            Za veće količine (preko 30 komada) ili veleprodajne upite, molimo vas da nas kontaktirate direktno za specijalnu ponudu.
          </Alert>
        </Box>

      </Box>

      <Snackbar
        open={openNotification}
        autoHideDuration={3000}
        onClose={() => setOpenNotification(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenNotification(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
