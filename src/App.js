import Top from './Top';
import TopBar from './TopBar';
import Products from './Products';
import Cart from './Cart';
import About from './About';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>

        <Top />
    <TopBar />
        <Routes>
            <Route 
          path="/" 
          element={
            <>
    <Products />
    <div style={{marginTop:500}}></div>
</>
          } 
        />
        <Route path="/about" element={<About />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
    </>
  );
}

export default App;
