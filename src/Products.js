import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Snackbar, Alert, Card, CardContent, Grid, Divider, Chip, Tabs, Tab } from '@mui/material';
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

  // Category state
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const filteredProducts = selectedCategory === 'all'
    ? productsData
    : productsData.filter(p => p.category === selectedCategory);

  const getPrice = (product, quantity) => {
    // Find the range that covers the current quantity
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
    <Box sx={{
      py: 8,
      px: 2,
      background: 'linear-gradient(180deg, #f8f9fa 0%, #e8eef5 100%)',
      minHeight: { xs: "100vh", md: "40vh" },
    }}>
      <Box sx={{ maxWidth: 1600, mx: 'auto' }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 800,
            mb: 2,
            background: 'linear-gradient(135deg, #0f2352 0%, #1a3a82 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'fadeIn 0.8s ease',
          }}
        >
          Naša Ponuda
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            fontSize: 18,
            mb: 6,
            maxWidth: 600,
            mx: 'auto',
            animation: 'slideUp 0.8s ease 0.2s backwards',
          }}
        >
          Vrhunska streč folija za sigurno i efikasno pakovanje. <br />
          <span style={{ fontSize: '0.9em', opacity: 0.8 }}>Izaberite količinu da biste ostvarili popust.</span>
        </Typography>

        {/* Category Filter */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#0f2352',
                height: 3,
                borderRadius: 1.5,
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                color: 'text.secondary',
                mx: 1,
                '&.Mui-selected': {
                  color: '#0f2352',
                },
              },
            }}
          >
            <Tab label="Svi proizvodi" value="all" />
            <Tab label="Ručni streč" value="rucni" />
            <Tab label="Mašinski streč" value="masinski" />
            <Tab label="Baby Rolls" value="baby" />
          </Tabs>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {filteredProducts.map((p, index) => {
            const qty = quantities[p.id] || 1;

            // Calculate price for display (just for the current selection)
            const currentPrice = getPrice(p, qty);
            const totalPrice = qty * currentPrice;

            const inCartItem = cartItems.find(item => item.id === p.id);
            const inCartQty = inCartItem ? inCartItem.quantity : 0;

            return (
              <Grid
                item
                key={p.id}
                xs={12}
                sm={6}
                md={3}
                lg={3}
                sx={{
                  animation: 'slideUp 0.6s ease backwards',
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)',
                    boxShadow: '0 10px 40px -10px rgba(15, 35, 82, 0.12)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 20px 60px -10px rgba(15, 35, 82, 0.25), 0 0 0 1px rgba(26, 58, 130, 0.1)',
                    },
                    height: '100%',
                    position: 'relative',
                    border: inCartQty > 0 ? '2px solid #4caf50' : '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  {inCartQty > 0 && (
                    <Chip
                      icon={<CheckCircleIcon style={{ color: 'white' }} />}
                      label={`U korpi: ${inCartQty}`}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
                        color: 'white',
                        fontWeight: 'bold',
                        zIndex: 2,
                        animation: 'pulse 2s ease-in-out infinite',
                        boxShadow: '0 4px 12px rgba(76, 175, 80, 0.4)',
                      }}
                    />
                  )}

                  {/* Image Section */}
                  <Box sx={{
                    width: '100%',
                    height: { xs: 150, sm: 200 },
                    bgcolor: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    borderBottom: '1px solid #eee'
                  }}>
                    <img
                      src={p.img}
                      alt={p.name}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </Box>

                  {/* Content Section */}
                  <CardContent sx={{ flex: 1, p: 2.5, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="#0f2352" sx={{ fontSize: '1.1rem', lineHeight: 1.3, minHeight: '2.6em' }}>
                      {p.name}
                    </Typography>

                    {/* Price Tiers Visualizer */}
                    <Box sx={{ mb: 2, mt: 'auto' }}>
                      <Typography variant="caption" color="text.secondary" fontWeight="bold" textTransform="uppercase" letterSpacing={0.5} sx={{ fontSize: '0.65rem' }}>
                        Cenovnik
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                        {p.priceRanges.map((range, idx) => {
                          const isActive = qty >= range.min && qty <= range.max;
                          return (
                            <Box
                              key={idx}
                              onClick={() => handleChange(p.id, range.min)}
                              sx={{
                                border: isActive ? '1.5px solid #0f2352' : '1px solid #e0e0e0',
                                background: isActive ? 'linear-gradient(135deg, #eef2ff 0%, #dce4ff 100%)' : 'transparent',
                                borderRadius: 1.5,
                                px: 1, py: 0.5,
                                textAlign: 'center',
                                flex: 1,
                                minWidth: 50,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                transform: isActive ? 'scale(1.02)' : 'scale(1)',
                                '&:hover': {
                                  borderColor: '#0f2352',
                                  background: isActive ? 'linear-gradient(135deg, #eef2ff 0%, #dce4ff 100%)' : '#f5f5f5',
                                }
                              }}
                            >
                              <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.65rem', lineHeight: 1 }}>
                                {range.min}-{range.max}
                              </Typography>
                              <Typography variant="body2" fontWeight="bold" color={isActive ? '#0f2352' : 'text.primary'} sx={{ fontSize: '0.85rem' }}>
                                {range.price} RSD
                              </Typography>
                            </Box>
                          )
                        })}
                      </Box>
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    {/* Controls */}
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 2, bgcolor: '#fff', height: 32 }}>
                          <IconButton onClick={() => handleDecrement(p.id)} color="primary" size="small">
                            <RemoveIcon fontSize="small" sx={{ fontSize: 16 }} />
                          </IconButton>
                          <Typography sx={{ mx: 1, fontWeight: 'bold', minWidth: 16, textAlign: 'center', fontSize: '0.9rem' }}>{qty}</Typography>
                          <IconButton onClick={() => handleIncrement(p.id)} color="primary" size="small">
                            <AddIcon fontSize="small" sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>

                          <Typography variant="body1" fontWeight="bold" color="#0f2352">
                            {totalPrice.toLocaleString()} RSD<Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>(+PDV)</Typography>
                          </Typography>
                        </Box>
                      </Box>

                      <Button
                        variant="contained"
                        fullWidth
                        size="medium"
                        startIcon={<ShoppingCartIcon sx={{ fontSize: 20 }} />}
                        onClick={() => orderProduct(p)}
                        sx={{
                          background: 'linear-gradient(135deg, #0f2352 0%, #1a3a82 100%)',
                          borderRadius: 2,
                          py: 1,
                          textTransform: 'none',
                          fontSize: '0.95rem',
                          fontWeight: 'bold',
                          boxShadow: '0 4px 14px rgba(15, 35, 82, 0.3)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #1a3b80 0%, #2e56c4 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 24px rgba(15, 35, 82, 0.4)',
                          },
                        }}
                      >
                        Dodaj
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
            <b>Za veće količine (preko 30 komada)</b> ili veleprodajne upite, molimo vas da nas kontaktirate direktno za specijalnu ponudu.
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
