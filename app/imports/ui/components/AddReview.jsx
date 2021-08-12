import React from 'react';
import { AutoForm, ErrorsField, SubmitField, HiddenField, NumField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Header, Segment } from 'semantic-ui-react';
import { Reviews } from '../../api/review/Reviews';

const bridge = new SimpleSchema2Bridge(Reviews.schema);

/** Renders the Page for adding a document. */
class AddReview extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { review, contactId, createdAt } = data;
    const owner = Meteor.user().username;
    Reviews.collection.insert({ review, contactId, createdAt, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Comment added successfully', 'success');
          formRef.reset();
        }
      });
  }

  render() {
    let fRef = null;
    return (
      <AutoForm placeholder={true} ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
        <Segment style={{ backgroundColor: '#d9cbb6' }}>
          <Header>Write A Comment</Header>
          <LongTextField label="Review" name='review'/>
          <SubmitField centered value='Submit'/>
          <ErrorsField/>
          <HiddenField name='contactId' value={this.props.contactId}/>
          <HiddenField name='createdAt' value={new Date()}/>
        </Segment>
      </AutoForm>
    );
  }
}

AddReview.propTypes = {
  contactId: PropTypes.string.isRequired,
};

export default AddReview;
