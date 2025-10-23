import './css/top.css';
import { Facebook, Instagram } from '@mui/icons-material';

const Top = () => {
    return(
                <div className="headerTopBar">
                <div className="row nestani">
                  <label className='boja'>Porucite telefonom:</label>
                    <span className="spanTop nestani">
                        <a href="tel:00381658557973" className="ajp">
                            065-123 3444 - Dušan
                        </a>
                    </span>                    
                    <span className="spanTop nestani">
                        <a href="tel:00381658557973" className="ajp">
                            065-123 3555 - Nenad
                        </a>
                    </span>
                    <span className="spanTop nestani">
                        <Facebook sx={{ fontSize: 25, color: '#a5afbbff' , '&:hover': { color: 'white' } }} />
                        <Instagram sx={{ fontSize: 25, color: '#a5afbbff' , '&:hover': { color: 'white' } }} />
                    </span>
                </div>
            </div>
    );
}
    export default Top; 