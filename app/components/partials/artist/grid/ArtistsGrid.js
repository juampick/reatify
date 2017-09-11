import React from 'react';
import PropTypes from 'prop-types';
import {Row, Grid, Col, Button, Thumbnail, Alert} from 'react-bootstrap';
import LoadingSpinner from '../../../common/loading_spinner/LoadingSpinner';
import ArtistItem from './item/ArtistItem';

class ArtistsGrid extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderArtists() {
    const {artists, onArtistClick, onFollowClick} = this.props;

    if (artists.isFetching) return <LoadingSpinner />;

    if (artists.items.length === 0) return (
      <Alert bsStyle="danger">You are not following artists. You need to follow at least 1. Please try again.</Alert>
    );

    const artistsView = artists.items.map(artist => {
      return (
        <Col key={artist.id} xs={12} md={4}>
          <ArtistItem
            artist={artist}
            onArtistClick={onArtistClick}
            onFollowClick={onFollowClick}/>
        </Col>
      );
    });

    return (
      artistsView
    );
  }

  render() {
    return (
      <Grid>
        {this.renderArtists()}
      </Grid>
    );
  }
}

ArtistsGrid.propTypes = {
  artists: PropTypes.object.isRequired,
  onArtistClick: PropTypes.func.isRequired,
  onFollowClick: PropTypes.func.isRequired
};

export default ArtistsGrid;
