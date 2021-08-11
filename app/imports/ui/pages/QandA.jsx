import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const landingStyle = { paddingBottom: '50px', paddingTop: '50px' };
    return (
      <Grid style={landingStyle} id='landing-page' container centered>
        <Grid.Column width={11}>
          <h2 className="landing">Q&A</h2>
          <p className="mission-text">Q) How can I use this site as a buyer or seller?</p>
          <p className="mission-text">- A) Please fill out your profile after signing up.</p>
          <p className="mission-text">Q) If I want to sell clothes, what should I do?</p>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className="mission-text">- A) Please click on the 'POST ITEM' button in red at the top right of the site.</p>
          <p className="mission-text">Q) I want to buy clothes, what should I do?</p>
          <p className="mission-text">- A) You can find clothes in the category you want to purchase. You can also use the search bar to navigave for items.</p>
          <Image size='massive' src='/images/landing.png'/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Landing;
