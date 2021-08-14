import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField, NumField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Clothes } from '../../api/clothes/Clothes';

const bridge = new SimpleSchema2Bridge(Clothes.schema);

/** Renders the Page for adding a document. */
class AddItem extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, category, brand, oldprice, newprice, image1, image2, image3, image4, status, description, condition, size, owner } = data;
    Clothes.collection.insert({ name, category, brand, oldprice, newprice, image1, image2, image3, image4, status, description, condition, size, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added to the database', 'success');
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
          <Header style={{ backgroundColor: '#f9f7f1' }} as="h2" textAlign="center" >Add Item</Header>
          <br/><br/>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
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

export default AddItem;
