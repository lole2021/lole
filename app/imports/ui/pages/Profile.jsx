import React from 'react';
import { Grid, Header, Loader, Image, Label, Icon, Card } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { Profiles } from '../../api/profile/Profiles';

/** Renders the UserProfile Page: what appears after the user logs in. */
class Profile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const email = Meteor.user().username;
    const profile = Profiles.collection.findOne({ email });

    return (
      <div style={{ paddingTop: '50px', paddingBottom: '50px' }}>
        <Header as="h3" style={{ textAlign: 'center', paddingBottom: '10px' }}>Your Profile</Header>
        <Grid id="profile-page" container centered>
          <Card color='blue'>
            <Image src={profile.picture}/>
            <Card.Content>
              <Card.Header>{profile.firstName} {profile.firstName}</Card.Header>
              <Card.Meta>
                <span><em>{profile.email}</em></span>
              </Card.Meta>
              <Card.Meta>
                <span><em>{profile.phone}</em></span>
              </Card.Meta>
              <Card.Description><em>{profile.bio}</em></Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Label attached='bottom'>
                <Icon name='setting' />
                <Link as={NavLink} activeClassName="active" exact to="/edituser" key='user'>Edit Profile</Link>
              </Label>
            </Card.Content>
          </Card>
        </Grid>
      </div>
    );
  }
}

Profile.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const sub1 = Meteor.subscribe(Profiles.userPublicationName);
  return {
    ready: sub1.ready(),
  };
})(Profile);
