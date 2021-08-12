import React from 'react';
import { Grid, Header, Loader, Container, Image, Item, Label, Icon } from 'semantic-ui-react';
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
      <div style={{ paddingTop: '50px' }}>
        <Container>
          <Header id='welcome2' as="h2" style={{ textAlign: 'center' }}>{profile.firstName}&nbsp;{profile.lastName}</Header>
          <Grid id="UserProfile-page" container centered>

            <Grid.Row>
              <Grid.Column width={5}>
                <Image size='massive' src={profile.picture}/>
              </Grid.Column>
              <Grid.Column width={10}>

                <Item.Group relaxed>

                  <Item>
                    <Item.Header as='h5'>Email:</Item.Header>
                    <Item.Content verticalAlign='middle'>&nbsp;{profile.email}</Item.Content>
                  </Item>

                  <Item>
                    <Item.Header as='h5'>Title:</Item.Header>
                    <Item.Content verticalAlign='middle'>&nbsp;{profile.phone}</Item.Content>
                  </Item>

                  <Item>
                    <Item.Header as='h5'>Bio:</Item.Header>
                    <Item.Content verticalAlign='middle'>&nbsp;{profile.bio}</Item.Content>
                  </Item>

                </Item.Group>
              </Grid.Column>

              <Grid.Column width={1}>
                <Label attached='bottom right'>
                  <Icon name='setting' />
                  <Link as={NavLink} id="editUser-Button" activeClassName="active" exact to="/edituser" key='home'>Edit</Link>
                </Label>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

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
