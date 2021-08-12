import React from 'react';
import { AutoForm, ErrorsField, SubmitField, HiddenField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Header, Segment } from 'semantic-ui-react';
import { Comments } from '../../api/comment/Comments';

const bridge = new SimpleSchema2Bridge(Comments.schema);

/** Renders the Page for adding a document. */
class AddComment extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { comment, contactId, createdAt } = data;
    const owner = Meteor.user().username;
    Comments.collection.insert({ comment, contactId, createdAt, owner },
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
          <LongTextField label="Comment" name='comment'/>
          <SubmitField centered value='Submit'/>
          <ErrorsField/>
          <HiddenField name='contactId' value={this.props.contactId}/>
          <HiddenField name='createdAt' value={new Date()}/>
        </Segment>
      </AutoForm>
    );
  }
}

AddComment.propTypes = {
  contactId: PropTypes.string.isRequired,
};

export default AddComment;
