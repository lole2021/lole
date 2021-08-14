import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const landingStyle = { paddingBottom: '50px', paddingTop: '50px' };
    return (
      <Grid style={landingStyle} id='mission-page' container centered>
        <Grid.Column width={8}>
          <h2 className="landing">Our Mission</h2>
          <p className="mission-text">Our mission is to streamline the process of online buying and selling of clothes.
            The idea is to encourage the transition to a cleaner world, taking into account that second-hand clothes are
            an alternative for conscious consumption.We offer our customers clothes of excellent quality and price, sold
            by those in within their local community. </p>
          <Image size='massive' src='images/background.png'/>
        </Grid.Column>

      </Grid>
    );
  }
}

export default Landing;
