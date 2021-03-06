import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
import { AutoForm, TextField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';
import { updateProfileMethod } from '../../startup/both/Methods';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

class EditProfile extends React.Component {
  submit(data) {
    Meteor.call(updateProfileMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success');
      }
    });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const email = Meteor.user().username;
    const profile = Profiles.collection.findOne({ email });
    const model = _.extend({}, profile);
    return (
      <div className="edit-profile">
        <Grid container centered>
          <Grid.Column width={8}>
            <AutoForm model={model} schema={bridge} onSubmit={data => this.submit(data)}>
              <Header as="h1" textAlign="center" style={{ color: '#849ca4' }}><em>Edit Your Information</em></Header>
              <Segment style={{ backgroundColor: '#d9cbb6' }}>
                <Form.Group widths={'equal'}>
                  <TextField id='firstName' name='firstName' showInlineError={true} placeholder={'First Name'}/>
                  <TextField id='lastName' name='lastName' showInlineError={true} placeholder={'Last Name'}/>
                </Form.Group>
                <TextField name='email' showInlineError={true} placeholder={'email'} disabled/>
                <LongTextField id='bio' name='bio' placeholder='Write a little bit about yourself.'/>
                <Form.Group widths={'equal'}>
                  <TextField name='phone' id='phone' showInlineError={true} placeholder={'(***) ***_****'}/>
                  <TextField name='picture' id='picture' showInlineError={true} placeholder={'URL to picture'}/>
                </Form.Group>
                <Form.Button color="brown" id="editprofile-submit" content="Submit"/>
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
