import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Grid } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { backgroundColor: '#d9cbb6', marginTop: '-10px', padding: '8px' };
    return (
      <Grid>
        <Grid.Column width={2}>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Image style = {{ marginTop: '-40px' }} src="https://avatars.githubusercontent.com/u/87914763?s=400&u=26db71c827beeca212884f31877a9ac240e6b801&v=4"/>
          </Menu.Item>
        </Grid.Column>

        <Menu widths={4} className="category" style={menuStyle} inverted>
          {this.props.currentUser ? (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/women" key='women'>WOMEN</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/men" key='men'>MEN</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/kids" key='kids'>KIDS</Menu.Item>,
            ]
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
          ) : ''}
          <Menu.Item position="right">
            {this.props.currentUser === '' ? (
              <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
                <Dropdown.Menu>
                  <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                  <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
                <Dropdown.Menu>
                  {/* eslint-disable-next-line max-len */}
                  <Dropdown.Item icon="user" text="My Profile" as={NavLink} exact to="/profile" />
                  <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Menu.Item>
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
