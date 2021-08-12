import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Image } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    const landingStyle = { paddingBottom: '100px', paddingTop: '50px' };
    return (
      <Grid style={landingStyle} id='landing-page' container centered>
        <Grid.Column width={11}>
          <h2 className="signout" textAlign="center">We hope to see your soon!</h2>
          <Image size='massive' src='/images/landing.png'/>
        </Grid.Column>

      </Grid>
    );
  }
}
