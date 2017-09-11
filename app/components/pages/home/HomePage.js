import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Row, Col, Button} from 'react-bootstrap';
import * as artistsActions from '../../../actions/artistsActions';
import ArtistsGrid from '../../partials/artist/grid/ArtistsGrid';
import ArtistsCarousel from '../../partials/artist/carousel/ArtistsCarousel';
import LoadingSpinner from '../../common/loading_spinner/LoadingSpinner';
import './HomePage.scss';

export class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleArtistClick = this.handleArtistClick.bind(this);
    this.handleFollowClick = this.handleFollowClick.bind(this);
    this.resetRelatedArtists = this.resetRelatedArtists.bind(this);
  }

  componentWillMount() {
    this.loadFollowedArtists();
  }

  loadFollowedArtists() {
    this.props.artistsActions.getFollowingArtists();
  }

  handleArtistClick(id, name) {
    this.props.artistsActions.getRelatedArtists(id, name);
  }

  handleFollowClick(id, followToBe) {
    this.props.artistsActions.updateFollowArtist(id, followToBe);
  }

  resetRelatedArtists() {
    this.props.artistsActions.resetRelatedArtists();
  }

  renderRelatedArtistData() {
    const {relatedArtists} = this.props;

    if (relatedArtists.name && !relatedArtists.isFetching) {
      return (
        <Row className="artist-selected text-center">
          <div className="seed">
            <strong>SEED</strong>: {relatedArtists.name}
          </div>
          <div className="reset-seed">
            <Button bsStyle="success" onClick={this.resetRelatedArtists}><i className="fa fa-undo"/> &nbsp;Reset Seed</Button>
          </div>
        </Row>
      );
    }
  }

  render() {
    const {followingArtists, relatedArtists} = this.props;

    let artistsToShow = followingArtists;
    if (relatedArtists.isFetching || relatedArtists.items.length) {
      artistsToShow = relatedArtists;
    }

    if (artistsToShow.isFetching) return <LoadingSpinner className="loading-spinner-home" />;

    return (
      <Col lg={12} md={12} sm={12} xs={12}>
        <ArtistsCarousel
          artists={artistsToShow}/>
        {this.renderRelatedArtistData()}
        <ArtistsGrid
          artists={artistsToShow}
          onArtistClick={this.handleArtistClick}
          onFollowClick={this.handleFollowClick}
        />
      </Col>
    );
  }
}

HomePage.propTypes = {
  artistsActions: PropTypes.object.isRequired,
  followingArtists: PropTypes.shape({
    items: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.bool,
    errorMessage: PropTypes.string
  }).isRequired,
  relatedArtists: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    items: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.bool,
    errorMessage: PropTypes.string
  }).isRequired
};

function mapStatesToProps(state) {
  return {
    followingArtists: state.artistsFollowing,
    relatedArtists: state.artistsRelated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    artistsActions: bindActionCreators(artistsActions, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(HomePage);
