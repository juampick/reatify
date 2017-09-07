import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container">
      <footer>
        <p>Reatify Spotify Client App <cite title={currentYear}>{ currentYear }</cite> - juampick Labs</p>
      </footer>
    </div>
  );
};

export default Footer;
