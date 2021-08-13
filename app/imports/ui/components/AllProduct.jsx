import React from 'react';
import { Button, Card, Image, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ItemList extends React.Component {
  render() {
    return (
      <Card centered>
        <Link to={`/woman/${this.props.item._id}`}>
          <Image src={this.props.item.image1}/>
        </Link>
        <Card.Content>
          <Card.Header>
            <Link to={`/woman/${this.props.item._id}`}>{this.props.item.name}</Link>
          </Card.Header>
          <Card.Meta>Size: {this.props.item.size} | Brand: {this.props.item.brand} </Card.Meta>
          <Card.Meta style={{ textDecorationLine: 'line-through' }}>${this.props.item.oldprice} </Card.Meta>
          <Card.Meta>${this.props.item.newprice}</Card.Meta>
          <Card.Header>
            <Header textAlign='right'>
              <Button basic size='tiny' color='brown'>{this.props.item.status}</Button>
            </Header>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Meta>
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ItemList.propTypes = {
  item: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ItemList);
