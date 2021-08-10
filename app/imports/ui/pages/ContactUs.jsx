import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const landingStyle = { paddingBottom: '50px', paddingTop: '50px' };
    return (
      <Grid style={landingStyle} id='landing-page' container centered>
        <Grid.Column width={11}>
          <h2 className="landing" >Contact Us</h2>
          <p className="mission-text">For any inquiries, please do not hesitate to contact us. </p>
          <p className="mission-text">Tel: (808)123-4567 </p>
          <p className="mission-text">E-mail: <a className="mission-text" href=''>admin@lole.com</a> </p>
          <Image size='massive' src='/images/landing.png'/>
        </Grid.Column>

      </Grid>
    );
  }
}

export default Landing;
