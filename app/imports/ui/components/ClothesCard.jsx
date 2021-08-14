import React from 'react';
import { Button, Card, Image, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ClothesCard extends React.Component {
  render() {
    return (
      <Card centered>
        <Link to={`/woman/${this.props.clothes._id}`}>
          <Image src={this.props.clothes.image1}/>
        </Link>
        <Card.Content>
          <Card.Header>
            <Link to={`/woman/${this.props.clothes._id}`}>{this.props.clothes.name}</Link>
          </Card.Header>
          <Card.Meta>Size: {this.props.clothes.size} | Brand: {this.props.clothes.brand} </Card.Meta>
          <Card.Meta style={{ textDecorationLine: 'line-through' }}>${this.props.clothes.oldprice} </Card.Meta>
          <Card.Meta>${this.props.clothes.newprice}</Card.Meta>
          <Card.Header>
            <Header textAlign='right'>
              <Button basic size='tiny' color='brown'>{this.props.clothes.status}</Button>
            </Header>
          </Card.Header>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ClothesCard.propTypes = {
  clothes: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ClothesCard);
