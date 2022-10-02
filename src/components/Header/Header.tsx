import React, { useState } from 'react';

import cart from '@assets/images/cart.svg';
import logo from '@assets/images/logo.svg';
import user from '@assets/images/user.svg';
import Burger from '@components/Burger';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const navList: { label: string; path: string }[] = [
    { label: 'Product', path: '/product-list' },
    { label: 'Services', path: '/services' },
    { label: 'Article', path: '/article' },
    { label: 'About us', path: '/about-us' },
  ];
  const navListClasses = classNames(styles.Nav__list, {
    [styles.Nav__list_open]: isOpen,
  });

  const setActive = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.Nav__link, isActive && styles.Nav__link_active);

  return (
    <header className={styles.Block}>
      <div className={`${styles.Block__container} Container`}>
        <Link to="/" className={styles.Block__logo}>
          <img src={logo} alt="" className={styles.Img} />
        </Link>
        <nav className={styles.Nav}>
          <ul className={navListClasses}>
            {navList.map((item, i) => (
              <li key={i}>
                <NavLink
                  to={item.path}
                  className={setActive}
                  onClick={handleToggle}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.Block__inner}>
          <Link to={'/cart'} className={styles.Block__innerLink}>
            <img src={cart} alt="" />
          </Link>
          <Link to={'/login'} className={styles.Block__innerLink}>
            <img src={user} alt="" />
          </Link>
        </div>
        <Burger isOpen={isOpen} onClick={handleToggle} />
      </div>
    </header>
  );
};

export default Header;
