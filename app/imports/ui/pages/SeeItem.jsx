import React from 'react';
import { Grid, Loader, Image, Icon, Card, Feed } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Clothes } from '../../api/clothes/Clothes';
import { Comments } from '../../api/comment/Comments';
import AddComment from '../components/AddComment';
import Comment from '../components/Comment';

/** Renders the Page for editing a single document. */
class SeeItem extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const filter = this.props.comments.filter(comment => comment.contactId === this.props.clothes._id);
    return (
      <Grid container columns={3}>
        <Grid.Column width={8} style={{ marginLeft: '-100px' }} >
          <Image size='huge' src={this.props.clothes.image1} />
        </Grid.Column>

        <Grid.Column width={3} style={{ marginLeft: '-20px' }}>
          <Grid.Row><Image size='small' src={this.props.clothes.image2}/></Grid.Row>
          <Grid.Row><Image size='small' src={this.props.clothes.image3}/></Grid.Row>
          <Grid.Row><Image size='small' src={this.props.clothes.image4}/></Grid.Row>
        </Grid.Column>

        <Grid.Column style={{ marginLeft: '40px' }} width={6}>
          <h3>{this.props.clothes.name}</h3>
          <h5 style={{ marginTop: '-5px' }}>${this.props.clothes.newprice}  | <del>${this.props.clothes.oldprice}</del></h5>
          <p><li>Brand: {this.props.clothes.brand}</li>
            <li>Size: {this.props.clothes.size}</li>
            <li>Condition: {this.props.clothes.condition}</li></p>
          <p><em>{this.props.clothes.description}</em></p>
          <p>ABOUT THE SELLER</p>
          <Icon name='user'/> <em>{this.props.clothes.owner}</em>
          <br/><br/>
          <Card fluid>
            <Card.Content>
              <Feed>
                {filter.map((comment, index) => <Comment key={index} comment={comment}/>)}
              </Feed>
            </Card.Content>
          </Card>
          <AddComment contactId={this.props.clothes._id}/>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Contact document in the props object. Uniforms adds 'model' to the props, which we use.
SeeItem.propTypes = {
  clothes: PropTypes.object,
  comments: PropTypes.array.isRequired,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe(Clothes.userPublicationName);
  const subscription2 = Meteor.subscribe(Comments.userPublicationName);
  const ready = subscription.ready() && subscription2.ready();
  const clothes = Clothes.collection.findOne(documentId);
  const comments = Comments.collection.find({}).fetch();
  return {
    clothes,
    comments,
    ready,
  };
})(SeeItem);
