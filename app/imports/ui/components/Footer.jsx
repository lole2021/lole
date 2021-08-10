import React from 'react';
import { Grid, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const menuStyle = { backgroundColor: '#d9cbb6', marginTop: '-10px', padding: '8px' };
    return (
      <Grid>
        <Menu inverted style={menuStyle} widths={3}>
          <Menu.Item>
            <Link to={'/qanda'}>Q&A</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={'/ourmission'}>Our Mission</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={'/contactus'}>Contact Us</Link>
          </Menu.Item>
        </Menu>
      </Grid>
    );
  }
}

export default Footer;
