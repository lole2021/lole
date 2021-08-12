import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
import { AutoForm, TextField, LongTextField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';
import { updateProfileMethod } from '../../startup/both/Methods';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/** Renders the EditUSer Page: what appears after the user logs in. */
class EditProfile extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    Meteor.call(updateProfileMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success');
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const email = Meteor.user().username;
    const profile = Profiles.collection.findOne({ email });
    const model = _.extend({}, profile);
    return (
      <div id='edit-user-page' style={{ paddingTop: '20px' }}>
        <Header as="h2" textAlign="center" inverted style={{ fontSize: '100px' }}>Edit Your Profile</Header>
        <Grid id="EditUSer-page" container centered>
          <Grid.Column>
            <AutoForm model={model} schema={bridge} onSubmit={data => this.submit(data)}>
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField id='firstName' name='firstName' showInlineError={true} placeholder={'First Name'}/>
                  <TextField id='lastName' name='lastName' showInlineError={true} placeholder={'Last Name'}/>
                  <TextField name='email' showInlineError={true} placeholder={'email'} disabled/>
                </Form.Group>
                <LongTextField id='bio' name='bio' placeholder='Write a little bit about yourself.'/>
                <Form.Group widths={'equal'}>
                  <TextField id='title' name='phone' showInlineError={true} placeholder={'Title'}/>
                  <TextField id='picture' name='picture' showInlineError={true} placeholder={'URL to picture'}/>
                </Form.Group>
                <SubmitField id='editUser-page-submit' value='Update'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

EditProfile.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const sub1 = Meteor.subscribe(Profiles.userPublicationName);
  return {
    ready: sub1.ready(),
  };
})(EditProfile);
