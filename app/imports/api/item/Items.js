import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class ItemsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ItemsCollection';
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema ({
      name: String,
      brand: String,
      category: {
        type: String,
        allowedValues: ['MEN', 'WOMEN', 'KIDS'],
        defaultValue: 'choose',
      },
      oldprice: Number,
      newprice: Number,
      image1: String,
      image2: String,
      image3: String,
      image4: String,
      size: {
        type: String,
        allowedValues: ['S', 'M', 'L'],
        defaultValue: 'M',
      },
      status: String,
      description: String,
      condition: {
        type: String,
        allowedValues: ['bad', 'good', 'excellent'],
        defaultValue: 'good',
      },
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Items = new ItemsCollection();
