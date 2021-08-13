import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Women } from '../../api/woman/Women';
import { Kids } from '../../api/kid/Kids';
import { Men } from '../../api/man/Men';
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
function addWomanClothes(data) {
  console.log(`  Adding: ${data.name}`);
  Women.collection.insert(data);
}

function addMenClothes(data) {
  console.log(`  Adding: ${data.name}`);
  Men.collection.insert(data);
}

function addKidsClothes(data) {
  console.log(`  Adding: ${data.name}`);
  Kids.collection.insert(data);
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

if (Women.collection.find().count() === 0) {
  if (Meteor.settings.defaultWomenClothes) {
    console.log('Creating default Women Clothes.');
    Meteor.settings.defaultWomenClothes.map(data => addWomanClothes(data));
  }
}

if (Men.collection.find().count() === 0) {
  if (Meteor.settings.defaultMenClothes) {
    console.log('Creating default Men Clothes.');
    Meteor.settings.defaultMenClothes.map(data => addMenClothes(data));
  }
}

if (Kids.collection.find().count() === 0) {
  if (Meteor.settings.defaultKidsClothes) {
    console.log('Creating default Kid Clothes.');
    Meteor.settings.defaultKidsClothes.map(data => addKidsClothes(data));
  }
}

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default Profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfile(data));
  }
}
