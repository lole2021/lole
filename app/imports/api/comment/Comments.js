import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class CommentsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'CommentsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      comment: String,
      contactId: String,
      createdAt: Date,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    // this.adminPublicationName = `${this.name}.publication.admin`;
    this.allPublicationName = `${this.name}.publication.temp`;
    this.itemPublicationName = `${this.name}.publication.item`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {CommentsCollection}
 */
export const Comments = new CommentsCollection();
