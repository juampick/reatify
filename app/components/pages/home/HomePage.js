import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Panel, Pager, Col, Button, PageHeader} from 'react-bootstrap';
import * as artistsActions from '../../../actions/artistsActions';
import ArtistsGrid from '../../partials/artist/grid/ArtistsGrid';
import ArtistsCarousel from '../../partials/artist/carousel/ArtistsCarousel';
import LoadingSpinner from '../../common/loading_spinner/LoadingSpinner';
import './HomePage.scss';

class HomePage extends React.Component {
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
        <Row className="artist-selected" pullRight>
          <strong>{relatedArtists.name}</strong> &nbsp;
          <Button bsStyle="success" bsSize="xs" onClick={this.resetRelatedArtists}><i className="fa fa-undo"/> &nbsp;Reset Related
            Artists</Button>
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

    return (
      <Col lg={12} md={12} sm={2} xs={4}>
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
  }).isRequired,
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
