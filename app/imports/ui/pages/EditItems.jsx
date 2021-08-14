import React from 'react';
import { Grid, Loader, Header, Segment, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Clothes } from '../../api/clothes/Clothes';

const bridge = new SimpleSchema2Bridge(Clothes.schema);

/** Renders the Page for editing a single document. */
class EditStuff extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { name, category, brand, oldprice, newprice, image1, image2, image3, image4, status, description, condition, size, owner, _id } = data;
    Clothes.collection.update(_id, { $set: { name, category, brand, oldprice, newprice, image1, image2, image3, image4, status, description, condition, size, owner } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Item</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField name='name' placeholder={'Name'}/>
                <TextField name='brand' placeholder={'Brand'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <NumField name='oldprice' placeholder={'Original Price'} decimal={false}/>
                <NumField name='newprice' placeholder={'Price'} decimal={false}/>
                <TextField name='size' placeholder={'Size'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <TextField name='image1' />
                <TextField name='image2'/>
                <TextField name='image3'/>
                <TextField name='image4'/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <TextField name='condition' placeholder={'Condition'}/>
                <TextField name='category' placeholder={'Category'}/>
                <TextField name='status' placeholder={'Status'}/>
                <TextField name='condition' placeholder={'Condition'}/>
              </Form.Group>
              <TextField name='owner' placeholder={'Leave your email.'}/>
              <TextField name='description' placeholder={'Description'}/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='owner' />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditStuff.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Clothes.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Clothes.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditStuff);
