import React from 'react';
import { Grid, Loader, Image, Icon, Card, Feed } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Women } from '../../api/woman/Women';
import Review from '../components/Review';
import { Reviews } from '../../api/review/Reviews';
import AddReview from '../components/AddReview';

/** Renders the Page for editing a single document. */
class WomanItemView extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const filter = this.props.reviews.filter(review => review.contactId === this.props.woman._id);
    return (
      <Grid container columns={3}>
        <Grid.Column width={8} style={{ marginLeft: '-100px' }} >
          <Image size='huge' src={this.props.woman.image1} />
        </Grid.Column>

        <Grid.Column width={3} style={{ marginLeft: '-20px' }}>
          <Grid.Row><Image size='small' src={this.props.woman.image2}/></Grid.Row>
          <Grid.Row><Image size='small' src={this.props.woman.image3}/></Grid.Row>
          <Grid.Row><Image size='small' src={this.props.woman.image4}/></Grid.Row>
        </Grid.Column>

        <Grid.Column style={{ marginLeft: '40px' }} width={6}>
          <h3>{this.props.woman.name}</h3>
          <h5 style={{ marginTop: '-5px' }}>${this.props.woman.newprice}  | <del>${this.props.woman.oldprice}</del></h5>
          <p><li>Brand: {this.props.woman.brand}</li>
            <li>Size: {this.props.woman.size}</li>
            <li>Condition: {this.props.woman.condition}</li></p>
          <p><em>{this.props.woman.description}</em></p>
          <p>ABOUT THE SELLER</p>
          <Icon name='user'/> <em>{this.props.woman.owner}</em>
          <br/><br/>
          <Card fluid>
            <Card.Content>
              <Feed>
                {filter.map((review, index) => <Review key={index} review={review}/>)}
              </Feed>
            </Card.Content>
          </Card>
          <AddReview contactId={this.props.woman._id}/>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Contact document in the props object. Uniforms adds 'model' to the props, which we use.
WomanItemView.propTypes = {
  woman: PropTypes.object,
  reviews: PropTypes.array.isRequired,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe(Women.userPublicationName);
  const subscription2 = Meteor.subscribe(Reviews.userPublicationName);
  const ready = subscription.ready() && subscription2.ready();
  const woman = Women.collection.findOne(documentId);
  const reviews = Reviews.collection.find({}).fetch();
  return {
    woman,
    reviews,
    ready,
  };
})(WomanItemView);
