import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col, PageHeader, Panel, Button} from 'react-bootstrap';
import './ProfilePage.scss';

export class ProfilePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {user} = this.props;
    return (
      <Col lg={6} lgOffset={3} md={6} mdOffset={3} sm={8} smOffset={2} xs={12}>
        <PageHeader>Profile Page <small>{user.id}</small></PageHeader>
        <Panel header="Profile Page" bsStyle="success">
          <Row>
            <Col md={6}>
              {user.image && <img src={user.image} className="img-rounded" width={200} height={200}/>}
              {!user.image && <span className="profile-no-image" />}
            </Col>
            <Col md={6}>
              <p><strong>Name:</strong> {user.id}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>BirthDate:</strong> {user.birthDate}</p>
              <p><strong>Country:</strong> {user.country}</p>
              <p><strong>Spotify Account:</strong> <span className="label label-success"> {user.product}</span></p>
              <hr/>
              <Button href={user.externalUrl} target="_black" bsStyle="success">
                Check public profile
              </Button>
            </Col>
          </Row>
        </Panel>
      </Col>
    );
  }
}

ProfilePage.propTypes = {
  user: PropTypes.object.isRequired
};

function mapStatesToProps(state) {
  return {
    user: state.user.data
  };
}

export default connect(mapStatesToProps, null)(ProfilePage);
