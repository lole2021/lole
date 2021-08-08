import React from 'react';
import { Button, Card, Image, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Woman extends React.Component {
  render() {
    return (
      <Card centered>
        <Link to={`/woman/${this.props.woman._id}`}>
          <Image src={this.props.woman.image1}/>
        </Link>
        <Card.Content>
          <Card.Header>
            <Link to={`/woman/${this.props.woman._id}`}>{this.props.woman.name}</Link>
          </Card.Header>
          <Card.Meta>Size: {this.props.woman.size} | Brand: {this.props.woman.brand} </Card.Meta>
          <Card.Meta style={{ textDecorationLine: 'line-through' }}>${this.props.woman.oldprice} </Card.Meta>
          <Card.Meta>${this.props.woman.newprice}</Card.Meta>
          <Card.Header>
            <Header textAlign='right'>
              <Button basic size='tiny' color='brown'>{this.props.woman.status}</Button>
            </Header>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Meta>
            <Icon name='user'/>   {this.props.woman.email}
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Woman.propTypes = {
  woman: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Woman);
