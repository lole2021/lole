import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Clothes } from '../../api/clothes/Clothes';
// eslint-disable-next-line import/named
import { Comments } from '../../api/comment/Comments';
import { Profiles } from '../../api/profile/Profiles';
import { Items } from '../../api/item/Items';

Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());

Meteor.publish(Comments.userPublicationName, function () {
  if (this.userId) {
    return Comments.collection.find({});
  }
  return this.ready();
});

Meteor.publish(Clothes.userPublicationName, function () {
  if (this.userId) {
    return Clothes.collection.find();
  }
  return this.ready();
});

/* Admin Level */

Meteor.publish(Clothes.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Clothes.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish(Items.allPublicationName, function () {
  if (this.userId) {
    return Items.collection.find();
  }
  return this.ready();
});

Meteor.publish(Comments.allPublicationName, function () {
  if (this.userId) {
    return Comments.collection.find();
  }
  return this.ready();
});
