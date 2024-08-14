import React, { useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import "./NavBarDi.css"

const NavBar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const isVisible = prevScrollPos > currentScrollPos;

    setVisible(isVisible);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div>
      <nav className={visible ? '' : 'navbar-hidden'}>
        <ul>
            <li> <Link to="/Productos">Productos</Link></li>
            <li> <Link to="/Catalogo">Catalogo</Link></li>
            <li> <Link to="/Provedores">Provedores</Link></li>
            <li> <Link to="/Graficas">Graficas</Link></li>
        </ul>
      </nav>
      <Outlet/>
      <div className="content">
        {/* Contenido de la página */}
      </div>
    </div>
  );
};

export default NavBar;
