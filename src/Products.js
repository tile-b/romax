import React, { useState, useRef } from 'react';
import { Box, Typography, Button, IconButton, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from './CartContext';
import productsData from './productsData';

export default function Products() {
  const { addToCart } = useCart();
  const priceTableRef = useRef(null);

  const [quantities, setQuantities] = useState({ 1: 1, 2: 1 }); // key = product id
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const getPrice = (product, quantity) => {
    const range = product.priceRanges.find(r => quantity >= r.min && quantity <= r.max);
    return range ? range.price : product.priceRanges[0].price;
  };

  const handleChange = (id, val) => {
    setQuantities(prev => ({ ...prev, [id]: val }));
  };

  const handleIncrement = (id) => handleChange(id, Number(quantities[id]) + 1);
  const handleDecrement = (id) => handleChange(id, Math.max(1, Number(quantities[id]) - 1));

  const orderProduct = (product) => {
    const qty = Number(quantities[product.id]);
    const price = getPrice(product, qty);
    addToCart({ ...product, quantity: qty, price });
    setNotificationMessage(`${product.name} je uspešno dodata u korpu!`);
    setOpenNotification(true);
  };

  const scrollToTable = () => priceTableRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h5" sx={{ textAlign: 'center', fontSize: 35, fontWeight: 'bold', mb: 1, color: '#0f2352' }}>
        Streč Folija
      </Typography>
      <Typography sx={{ textAlign: 'center', color: 'gray', fontSize: 15, mb: 4 }}>
        Ručne streč folije visoke kvalitete — idealne za pakovanje i zaštitu robe.
      </Typography>

      {/* Product Cards */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 1, sm: 6 }, flexWrap: { xs: 'nowrap', sm: 'wrap' }, overflowX: { xs: 'auto', sm: 'visible' } }}>
        {productsData.map((p) => (
          <Box key={p.id} sx={{ width: { xs: 160, sm: 250 }, flex: '0 0 auto', textAlign: 'center', p: 1, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', backgroundColor: 'white', '& img': { transition: 'transform 0.3s ease' }, '&:hover img': { transform: 'scale(1.05)' } }}>
            <img src={p.img} alt={p.name} style={{ width: '100%', borderRadius: 4 }} />
            <Typography sx={{ fontWeight: 'bold', mt: 1 }}>{p.name}</Typography>
            <Button variant="contained" sx={{ mt: 1, bgcolor: '#0f2352', '&:hover': { bgcolor: '#173272' } }} onClick={scrollToTable}>Odaberi</Button>
          </Box>
        ))}
      </Box>

      {/* Price Table */}
      <Box ref={priceTableRef} sx={{ mt: 6, p: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxWidth: 700, mx: 'auto' }}>
        <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#0f2352', mb: 2 }}>
          Cene po Količini
        </Typography>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f2f2f2' }}>
              <th style={{ padding: 10, border: '1px solid #a7a7a7ff' }}>Proizvod</th>
              <th style={{ padding: 10, border: '1px solid #a7a7a7ff' }}>1–9 kom</th>
              <th style={{ padding: 10, border: '1px solid #a7a7a7ff' }}>10–19 kom</th>
              <th style={{ padding: 10, border: '1px solid #a7a7a7ff' }}>20–30 kom</th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((p) => {
              const qty = quantities[p.id];
              const price = getPrice(p, qty);
              const getHighlightStyle = (priceRange) => {
                const isHighlighted = qty >= priceRange.min && qty <= priceRange.max;
                return {
                  padding: 10,
                  border: '1px solid #a7a7a7ff',
                  backgroundColor: isHighlighted ? '#d4dcecff' : 'transparent',
                  fontWeight: isHighlighted ? 'bold' : 'normal',
                  color: isHighlighted ? '#3881ffff' : '#b1b1b1ff',
                  transition: 'all 0.3s ease',
                };
              };
              return (
             
                <React.Fragment key={p.id}>
                  <tr>
                    <td style={{ padding: 10, border: '1px solid #a7a7a7ff', fontWeight: '400' }}>{p.name}</td>
                    <td style={getHighlightStyle(p.priceRanges[0])}>{p.priceRanges[0].price} RSD</td>
                    <td style={getHighlightStyle(p.priceRanges[1])}>{p.priceRanges[1].price} RSD</td>
                    <td style={getHighlightStyle(p.priceRanges[2])}>{p.priceRanges[2].price} RSD</td>
                  </tr>

                  {/* Quantity + buttons + order */}
                  <tr>
                    <td colSpan="4" style={{ padding: 10, border: '1px solid #a7a7a7ff' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <b>Količina:</b>
                        <IconButton size="small" onClick={() => handleDecrement(p.id)}><RemoveIcon /></IconButton>
                        <input type="number" min="1" value={qty} onChange={(e) => handleChange(p.id, e.target.value)} style={{ width: 50, textAlign: 'center' }} />
                        <IconButton size="small" onClick={() => handleIncrement(p.id)}><AddIcon /></IconButton>
                        <Button variant="contained" sx={{ bgcolor: '#0f2352', '&:hover': { bgcolor: '#173272' } }} onClick={() => orderProduct(p)}>Dodaj</Button>
                      </Box>

                      {/* Calculation row */}
                      <Typography sx={{ mt: 1, fontSize: 14, color: 'gray' }}>
                        Cena: {qty} × {price} RSD = <b>{qty * price} RSD</b>
                      </Typography>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </Box>

      {/* Notification Snackbar */}
      <Snackbar
        open={openNotification}
        autoHideDuration={3000}
        onClose={() => setOpenNotification(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenNotification(false)} severity="success" sx={{ width: '75%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
       <p style={{color: 'red', display: 'flex', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold'}}>*Za veće količine preporučujemo da nas kontaktirate.</p>
    </Box>
   
  );
}
