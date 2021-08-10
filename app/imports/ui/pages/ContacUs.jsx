import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const landingStyle = { paddingBottom: '50px', paddingTop: '50px' };
    return (
      <Grid style={landingStyle} id='landing-page' container centered>
        <Grid.Column width={11}>
          <h2 className="landing" >Our Mission</h2>
          <p>Our mission is to provide unforgettable and good experiences memories to last a lifetime.
            Offer our customers special pieces of excellent quality and price. With the use of our customers,
            users will feel even more confident. </p>
          <Image size='massive' src='/images/landing.png'/>
        </Grid.Column>

      </Grid>
    );
  }
}

export default Landing;
