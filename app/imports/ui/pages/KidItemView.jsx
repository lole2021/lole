import React from 'react';
import { Grid, Loader, Image, Icon, Card, Feed } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Kids } from '../../api/kid/Kids';
import { Comments } from '../../api/comment/Comments';
import AddComment from '../components/AddComment';
import Comment from '../components/Comment';

/** Renders the Page for editing a single document. */
class WomanItemView extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const filter = this.props.comments.filter(comment => comment.contactId === this.props.kid._id);
    return (
      <Grid container columns={3}>
        <Grid.Column width={8} style={{ marginLeft: '-100px' }} >
          <Image size='huge' src={this.props.kid.image1} />
        </Grid.Column>

        <Grid.Column width={3} style={{ marginLeft: '-20px' }}>
          <Grid.Row><Image size='small' src={this.props.kid.image2}/></Grid.Row>
          <Grid.Row><Image size='small' src={this.props.kid.image3}/></Grid.Row>
          <Grid.Row><Image size='small' src={this.props.kid.image4}/></Grid.Row>
        </Grid.Column>

        <Grid.Column style={{ marginLeft: '40px' }} width={6}>
          <h3>{this.props.kid.name}</h3>
          <h5 style={{ marginTop: '-5px' }}>${this.props.kid.newprice}  | <del>${this.props.kid.oldprice}</del></h5>
          <p><li>Brand: {this.props.kid.brand}</li>
            <li>Size: {this.props.kid.size}</li>
            <li>Condition: {this.props.kid.condition}</li></p>
          <p><em>{this.props.kid.description}</em></p>
          <p>ABOUT THE SELLER</p>
          <Icon name='user'/> <em>{this.props.kid.owner}</em>
          <br/><br/>
          <Card fluid>
            <Card.Content>
              <Feed>
                {filter.map((comment, index) => <Comment key={index} comment={comment}/>)}
              </Feed>
            </Card.Content>
          </Card>
          <AddComment contactId={this.props.kid._id}/>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Contact document in the props object. Uniforms adds 'model' to the props, which we use.
WomanItemView.propTypes = {
  kid: PropTypes.object,
  comments: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe(Kids.userPublicationName);
  const subscription2 = Meteor.subscribe(Comments.userPublicationName);
  const ready = subscription.ready() && subscription2.ready();
  const comments = Comments.collection.find({}).fetch();
  const kid = Kids.collection.findOne(documentId);
  return {
    kid,
    comments,
    ready,
  };
})(WomanItemView);
