import React from 'react';

import { Link } from 'react-router-dom';

import styles from './HomePage.module.scss';

const Homepage: React.FC = () => {
  return (
    <main className="Container">
      <div className={styles.Block__container}>
        <h1>Welcome to store-app</h1>
        <Link to="/product-list" className={`${styles.Block__link} title-h3`}>
          see our products
        </Link>
      </div>
    </main>
  );
};

export default Homepage;
