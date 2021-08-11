import { Meteor } from 'meteor/meteor';
import { Women } from '../../api/woman/Women';
import { Kids } from '../../api/kid/Kids';
import { Men } from '../../api/man/Men';
import { Profiles } from '../../api/profile/Profiles';
/* eslint-disable no-console */

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

function addProfile({ email, firstName, lastName, bio, picture, phone }) {
  console.log(`  Defining profile ${email}`);
  Profiles.collection.insert({ email, firstName, lastName, bio, picture, phone });
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
