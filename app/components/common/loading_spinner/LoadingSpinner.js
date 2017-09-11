import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

const LoadingSpinner = ({type, color, delay, width, height, className}) => {
  return (
    <ReactLoading
      type={type}
      color={color}
      delay={delay}
      width={width}
      height={height}
      className={className}/>
  );
};

LoadingSpinner.defaultProps = {
  delay: 0,
  color: '#1DB954',
  type: 'spinningBubbles',
  width: 64,
  height: 64,
  className: 'loading-spinner'
};

LoadingSpinner.propTypes = {
  type: PropTypes.string,
  delay: PropTypes.number,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string
};

export default LoadingSpinner;
