import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '../../api/profile/Profiles';

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  handleChange= (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  submit= () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        Profiles.collection.insert({ email }, (err2) => {
          if (err2) {
            this.setState({ error: err2.reason });
          } else {
            this.setState({ error: '', redirectToReferer: true });
          }
        });
      }
    });
  }

  /** Display the signup form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/adduser' } };
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }

    return (
      <div className='signup-page'>
        <div>
          <Container id="signup-page">
            <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
              <Grid.Column>
                <Header as="h2" textAlign="center"style={{ color: '#849ca4' }}><em>
                  Create a New Account
                </em></Header>
                <Form onSubmit={this.submit}>
                  <Segment stacked style={{ backgroundColor: '#d9cbb6' }}>
                    <Form.Input
                      label="Email"
                      id="signup-form-email"
                      icon="user"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="E-mail address"
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      label="Password"
                      id="signup-form-password"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                    />
                    <Form.Button color="brown" id="signup-form-submit" content="Submit"/>
                    <em>Already have an account?
                      <Link to="/signin"> Click here.</Link></em>
                  </Segment>
                </Form>
                {this.state.error === '' ? (
                  ''
                ) : (
                  <Message
                    error
                    header="Registration was not successful"
                    content={this.state.error}
                  />
                )}
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      </div>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
