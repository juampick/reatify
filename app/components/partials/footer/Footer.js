import React from 'react';
import {Grid} from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Grid fluid={true}>
      <footer className="text-center">
        <p>Reatify Spotify Client App <cite title={currentYear}>{currentYear}</cite> - juampick Labs</p>
      </footer>
    </Grid>
  );
};

export default Footer;
