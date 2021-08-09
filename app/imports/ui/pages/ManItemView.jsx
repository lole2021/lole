import React from 'react';
import { Grid, Loader, Image, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Men } from '../../api/man/Men';
// import Review from '../components/Review';
// import { Reviews } from '../../api/review/Reviews';
// import AddReview from '../components/AddReview';

/** Renders the Page for editing a single document. */
class WomanItemView extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    // const filter = this.props.reviews.filter(review => review.contactId === this.props.woman._id);
    return (
      <Grid container columns={3}>
        <Grid.Column width={8} style={{ marginLeft: '-100px' }} >
          <Image size='huge' src={this.props.man.image1} />
        </Grid.Column>

        <Grid.Column width={3} style={{ marginLeft: '-20px' }}>
          <Grid.Row><Image size='small' src={this.props.man.image2}/></Grid.Row>
          <Grid.Row><Image size='small' src={this.props.man.image3}/></Grid.Row>
          <Grid.Row><Image size='small' src={this.props.man.image4}/></Grid.Row>
        </Grid.Column>

        <Grid.Column style={{ marginLeft: '40px' }} width={6}>
          <h3>{this.props.man.name}</h3>
          <h5 style={{ marginTop: '-5px' }}>${this.props.man.newprice}  | <del>${this.props.man.oldprice}</del></h5>
          <p><li>Brand: {this.props.man.brand}</li>
            <li>Size: {this.props.man.size}</li>
            <li>Condition: {this.props.man.condition}</li></p>
          <p><em>{this.props.man.description}</em></p>
          <p>ABOUT THE SELLER</p>
          <Icon name='user'/> <em>{this.props.man.owner}</em>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Contact document in the props object. Uniforms adds 'model' to the props, which we use.
WomanItemView.propTypes = {
  man: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe(Men.userPublicationName);
  const ready = subscription.ready();
  const man = Men.collection.findOne(documentId);
  return {
    man,
    ready,
  };
})(WomanItemView);
