import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Clothes } from '../../api/clothes/Clothes';
import { Profiles } from '../../api/profile/Profiles';
import { Items } from '../../api/item/Items';
/* eslint-disable no-console */

function createUser(email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

function addProfile({ firstName, lastName, bio, phone, picture, email, role }) {
  console.log(`Defining profile ${email}`);
  createUser(email, role);
  Profiles.collection.insert({ firstName, lastName, bio, phone, picture, email });

}

// Initialize the database with a default data document.
function addClothes(data) {
  console.log(`  Adding: ${data.name}`);
  Clothes.collection.insert(data);
}

/** Initialize the database with a default data document. */
function addItem(data) {
  console.log(` Adding: ${data.name} (${data.owner})`);
  Items.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Items.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addItem(data));
  }
}

if (Clothes.collection.find().count() === 0) {
  if (Meteor.settings.defaultClothes) {
    console.log('Creating default clothes.');
    Meteor.settings.defaultClothes.map(data => addClothes(data));
  }
}

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default Profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfile(data));
  }
}
