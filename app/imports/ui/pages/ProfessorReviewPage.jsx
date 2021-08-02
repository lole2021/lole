import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
// import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { WomanItemReviews } from '../../api/womanItemReview/WomanItemReviews';

// Create a schema to specify the structure of the data to appear in the form.

const formSchema = new SimpleSchema({
  womanItemName: {
    type: String,
    label: 'Professor',
  },
  review: {
    type: String,
    max: 500,
  },
  rating: {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5],
    defaultValue: 3,
  },
  brand: {
    type: String,
    allowedValues: ['ICS 111', 'ICS 141', 'ICS 211', 'ICS 212', 'ICS 222', 'ICS 235', 'ICS 241', 'ICS 311', 'ICS 312', 'ICS 313', 'ICS 314', 'ICS 321',
      'ICS 332', 'ICS 369', 'ICS 390', 'ICS 414', 'ICS 423', 'ICS 426', 'ICS 428', 'ICS 438', 'ICS 451', 'ICS 455', 'ICS 466', 'ICS 484', 'ICS 486',
      'ICS 491', 'ICS 614', 'ICS 621', 'ICS 632', 'ICS 636', 'ICS 667', 'ICS 690'],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class ProfessorReviewPage extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { womanItemName, review, rating, brand } = data;
    const createdAt = new Date().toDateString();
    const owner = Meteor.user().username;
    WomanItemReviews.collection.insert({ womanItemName, rating, review, brand, owner, createdAt },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Review added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Write A Review!</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <SelectField name='rating' />
              <SelectField name='womanItemName'/>
              <SelectField name='brand'/>
              <LongTextField name='review'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

ProfessorReviewPage.propTypes = {
  professor: PropTypes.object,
};

export default ProfessorReviewPage;
