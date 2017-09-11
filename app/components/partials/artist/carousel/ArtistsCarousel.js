import React from 'react';
import PropTypes from 'prop-types';
import {Row, Carousel} from 'react-bootstrap';
import {IMAGE_COVER} from '../../../../resources/constants';
import {getImage} from '../../../../helpers/imageHelper';
import './ArtistsCarousel.scss';

class ArtistsCarousel extends React.Component {

  renderCarouselItems() {
    const {artists} = this.props;

    const artistsView = artists.items.map(artist => {
      const image = getImage(artist.images, IMAGE_COVER);
      if (image) {
        return (
          <Carousel.Item key={artist.id}>
            <img width={image.width} height={image.height} src={image.url} className="img-responsive"/>
            <Carousel.Caption>
              <h3>{artist.name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        );
      }
    });

    return (
      artistsView
    );
  }

  render() {
    const {artists} = this.props;

    if (artists.items.length === 0) return null;

    return (
      <Row className="artist-carousel">
        <Carousel pauseOnHover={false} interval={2000} indicators={false} controls={false}>
          {this.renderCarouselItems()}
        </Carousel>
      </Row>
    );
  }
}

ArtistsCarousel.propTypes = {
  artists: PropTypes.object.isRequired
};

export default ArtistsCarousel;
