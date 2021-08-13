import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Grid } from 'semantic-ui-react';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { backgroundColor: '#d9cbb6', marginTop: '-10px', padding: '8px' };
    return (
      <Grid>
        <Menu widths={4} className="category" style={menuStyle} inverted>
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/women" key='women'>WOMEN</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="active" exact to="/men" key='men'>MEN</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="active" exact to="/kids" key='kids'>KIDS</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="active" exact to="/sell" key='sell'>SELL</Menu.Item>,
            ]
        </Menu>
      </Grid>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
