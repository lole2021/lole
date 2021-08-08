import React from 'react';
import { Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

        <Grid.Column width={4}>
        </Grid.Column>

        <Grid.Column width={8}>
          <h1>Welcome to this template</h1>
          <p>Now get to work and modify this app!</p>
        </Grid.Column>

      </Grid>
    );
  }
}

export default Landing;
