import React from 'react';
import { Button, Card, Image, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Man extends React.Component {
  render() {
    return (
      <Card centered>
        <Link to={`/man/${this.props.man._id}`}>
          <Image src={this.props.man.image1}/>
        </Link>
        <Card.Content>
          <Card.Header>
            <Link to={`/man/${this.props.man._id}`}>{this.props.man.name}</Link>
          </Card.Header>
          <Card.Meta>Size: {this.props.man.size} | Brand: {this.props.man.brand} </Card.Meta>
          <Card.Meta style={{ textDecorationLine: 'line-through' }}>${this.props.man.oldprice} </Card.Meta>
          <Card.Meta>${this.props.man.newprice}</Card.Meta>
          <Card.Header>
            <Header textAlign='right'>
              <Button basic size='tiny' color='brown'>{this.props.man.status}</Button>
            </Header>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Meta>
            <Icon name='user'/>   {this.props.man.email}
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Man.propTypes = {
  man: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Man);
