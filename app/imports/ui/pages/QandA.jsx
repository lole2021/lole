import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const landingStyle = { paddingBottom: '50px', paddingTop: '50px' };
    return (
      <Grid style={landingStyle} id='qanda' container centered>
        <Grid.Column width={10}>
          <h2 className="landing">Q&A Support</h2>
          <p className="mission-text">Local Buyers</p>
          <p className="mission-text">There are many ways to purchase items on LOLE! We offer in-person meet-ups that allow
          you and your seller to meet up to make an item.
          <br></br>
          <strong>Buying from a verified seller:</strong>
          <ul>
            <li>Meet in person to buy and sell your items.</li>
            <li>Make your offers, then accept or decline based on the agreement.</li>
          </ul>
          </p>
          <p className="mission-text">Community Sellers</p>
          <p className="mission-text">Our application makes it easy to streamline the process of selling your items for cash!
            <br></br>
            <strong>Selling as a verified seller:</strong>
            <ul>
              <li>Create and online profile for more visibility.</li>
              <li>Upload the items that you wish to sell.</li>
              <li>Buyers will contact you once they find an item that you are interested in. If you both agree to the price, meet up will be determined.</li>
              <li>Local purchases will be made with cash only, making it easy for you to receive your payment quickly.</li>
            </ul>
          </p>
          <p className="mission-text">Purchasing From Verified Sellers</p>
          <p className="mission-text">All of our users on this site are verified as users before being able to post their items for sale.
          You will not need to worry about an item that is not in stock, or bought from users that do not exist - we make it easy to identify those
          who are verified sellers. This makes the purchasing process easy for both you and the seller!</p>
          <Image size='massive' src='/images/landing.png'/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Landing;
