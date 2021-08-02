import React from 'react';
import { Button, Card, Image, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link, NavLink } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Woman extends React.Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          <Image
            src={this.props.woman.image}
          />
          <Card.Header>
            <Link to={`/woman/${this.props.woman._id}`}>
              {this.props.woman.name} [{this.props.woman.brand}]
            </Link>
          </Card.Header>
          <Card.Meta>${this.props.woman.price}</Card.Meta>
          <br/>
          <Card.Header>
            <Header textAlign='center'>
              <Button size='tiny' color='black' as={NavLink} exact to={`/woman/${this.props.woman._id}`}>Visit</Button>
            </Header>
          </Card.Header>
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
