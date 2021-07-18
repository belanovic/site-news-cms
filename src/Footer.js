import React, { useEffect, useContext } from 'react';
import './style/footer.css';

export default function Header() {

    return (
        <footer className="footer">
                <div className="footer-copyright">
                    Copyright <i className="fas fa-copyright"> Goran Belanovic</i>
                </div>     
        </footer>
    )
}