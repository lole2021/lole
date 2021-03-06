import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class ClothesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ClothesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      category: String,
      brand: String,
      oldprice: { type: Number, optional: true },
      newprice: Number,
      image1: String,
      image2: String,
      image3: String,
      image4: String,
      status: String,
      description: String,
      condition: String,
      size: String,
      owner: String,
    }, { tracker: Tracker });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Clothes = new ClothesCollection();
