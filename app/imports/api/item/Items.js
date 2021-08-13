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
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.allPublicationName = `${this.name}.publication.item`;
    this.itemPublicationName = `${this.name}.publication.item`;
  }
}

export const Items = new ItemsCollection();
