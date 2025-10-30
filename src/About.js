import './css/load.css'
import { Link } from 'react-router-dom';

const About = () => {

    return( 
<div class="loader">
  <div class="loader-text">Stranica je u izradi....</div>
  <div class="loader-bar"></div>
  <div class="loader-text">Uskoro....</div>

  <Link to="/">
  <button className='nice-button'>Vrati se na Pocetnu</button>
  </Link>
</div>

);    }
export default About;   