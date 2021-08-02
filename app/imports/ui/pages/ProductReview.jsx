import React from 'react';
import { Grid, Loader, Card, Image, Rating, Feed } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Women } from '../../api/woman/Women';
import Review from '../components/Review';
import { Reviews } from '../../api/review/Reviews';
import AddReview from '../components/AddReview';

/** Renders the Page for editing a single document. */
class ProductReview extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const filter = this.props.reviews.filter(review => review.contactId === this.props.woman._id);
    return (
      <Grid container columns={2}>
        <Grid.Column width={4}>
          <Grid.Column>
            <Card>
              <Image size='tiny' src={this.props.woman.image} wrapped ui={false}/>
              <Card.Content>
                <Card.Header>{this.props.woman.name} {this.props.woman.brand}</Card.Header>
                <br/>
              </Card.Content>
              <Card.Content extra>
                <Rating disabled icon='star' maxRating={5} defaultRating={4}/>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Column>

        <Grid.Column width={10}>
          <AddReview contactId={this.props.woman._id}/>
          <Card fluid>
            <Card.Content>
              <Card.Header>Reviews for {this.props.woman.name} {this.props.woman.brand}</Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                {filter.map((review, index) => <Review key={index} review={review}/>)}
              </Feed>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Contact document in the props object. Uniforms adds 'model' to the props, which we use.
ProductReview.propTypes = {
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
})(ProductReview);
