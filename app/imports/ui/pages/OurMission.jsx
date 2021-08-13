import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const landingStyle = { paddingBottom: '50px', paddingTop: '50px' };
    return (
      <Grid style={landingStyle} id='landing-page' container centered>
        <Grid.Column width={6}>
          <h2 className="landing">Our Mission</h2>
          <p className="mission-text">Our mission is to streamline the process of online buying and selling of clothes.
              We offer our customers garments of excellent quality and price, sold by those in within our local community. Customers and
              sellers alike will feel more confident with their interactions, establishing rapport with each other, and promoting healthy
              business relationships. </p>
          <Image size='massive' src='/images/landing.png'/>
        </Grid.Column>

      </Grid>
    );
  }
}

export default Landing;
