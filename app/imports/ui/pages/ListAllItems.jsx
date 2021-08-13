import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Items } from '../../api/item/Items';
import AllProduct from '../components/AllProduct';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListAllItems extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div id='listallitem-page' className="item-list"><Container>
          <Header as="h3" textAlign="center">All Items</Header>
          <Card.Group>
            {this.props.items.map((item) => <AllProduct key={item._id} item={item} />)}
          </Card.Group>
        </Container></div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListAllItems.propTypes = {
  items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Items.allPublicationName);

  return {
    items: Items.collection.find({}).fetch(),
    ready: (subscription.ready()),
  };
})(ListAllItems);


