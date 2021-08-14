import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, SelectField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Items } from '../../api/item/Items';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  brand: String,
  category: {
    type: String,
    allowedValues: ['MEN', 'WOMEN', 'KIDS'],
    defaultValue: 'MEN',
  },
  oldprice: Number,
  newprice: Number,
  image1: String,
  image2: {
    type: String,
    optional: true,
  },
  image3: {
    type: String,
    optional: true,
  },
  image4: {
    type: String,
    optional: true,
  },
  size: {
    type: String,
    allowedValues: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    defaultValue: 'M',
  },
  status: {
    type: String,
    optional: true,
  },
  description: {
    type: String,
    max: 100,
    optional: true,
  },
  condition: {
    type: String,
    allowedValues: ['poor', 'good', 'excellent'],
    defaultValue: 'good',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class UploadItem extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, brand, category, oldprice, newprice, image1, image2, image3, image4, size, status, description, condition } = data;
    const owner = Meteor.user().username;
    Items.collection.insert({ name, brand, category, oldprice, newprice, image1, image2, image3, image4, size, status, description, condition, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Product uploaded successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
      <Grid id='upload-page' container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Upload Item</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment style={{ backgroundColor: '#f9f7f1' }}>
              <Form.Group widths={'equal'}>
                <TextField id='upload-item-form-name' name='name' placeholder={'Name'}/>
                <TextField id='upload-item-form-brand' name='brand' placeholder={'Brand'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <SelectField id='upload-item-form-category' name='category' placeholder={'Category'}/>
                <TextField id='upload-item-form-oldprice' name='oldprice' placeholder={'Original Price'}/>
                <TextField id='upload-item-form-newprice' name='newprice' placeholder={'Price'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <TextField id='upload-item-form-image1' name='image1'/>
                <TextField id='upload-item-form-image2' name='image2'/>
                <TextField id='upload-item-form-image3' name='image3'/>
                <TextField id='upload-item-form-image4' name='image4'/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <SelectField id='upload-item-form-size' name='size'/>
                <TextField id='upload-item-form-status' name='status'/>
                <SelectField id='upload-item-form-condition' name='condition'/>
              </Form.Group>
              <TextField id='upload-item-form-description' name='description' placeholder={'Description of the item.'}/>
              <SubmitField id='upload-item-form-submit' value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UploadItem;
