import Top from './Top';
import TopBar from './TopBar';
import Products from './Products';
import Cart from './Cart';
import About from './About';
import Footer from './Footer';
import HomeSection from './HomeSection';
import Contact from './Contact';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

  return (
    <>

        <Top />
    <TopBar />

    <ScrollToTop />
        <Routes>
            <Route 
          path="/" 
          element={
            <>
    <Products />
    <HomeSection />

</>
          } 
        />
        <Route path="/about" element={<About />} />
      <Route path="/cart" element={<Cart />} />
<Route path="/contact" element={<Contact />} />
            
    </Routes>
        <Footer />
    </>
  );
}

export default App;
