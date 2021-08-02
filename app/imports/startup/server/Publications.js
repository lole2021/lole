import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Women } from '../../api/woman/Women';
import { Men } from '../../api/man/Men';
import { Kids } from '../../api/kid/Kids';
import { Reviews } from '../../api/review/Reviews';
import { WomanItemReviews } from '../../api/womanItemReview/WomanItemReviews';

Meteor.publish(WomanItemReviews.userPublicationName, function () {
  if (this.userId) {
    return WomanItemReviews.collection.find();
  }
  return this.ready();
});

Meteor.publish(Reviews.userPublicationName, function () {
  if (this.userId) {
    return Reviews.collection.find({});
  }
  return this.ready();
});

Meteor.publish(Women.userPublicationName, function () {
  if (this.userId) {
    return Women.collection.find();
  }
  return this.ready();
});

Meteor.publish(Men.userPublicationName, function () {
  if (this.userId) {
    return Men.collection.find({});
  }
  return this.ready();
});

Meteor.publish(Kids.userPublicationName, function () {
  if (this.userId) {
    return Kids.collection.find({});
  }
  return this.ready();
});

/* Admin Level */

Meteor.publish(Women.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Women.collection.find();
  }
  return this.ready();
});

Meteor.publish(Men.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Men.collection.find();
  }
  return this.ready();
});

Meteor.publish(Kids.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Kids.collection.find();
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