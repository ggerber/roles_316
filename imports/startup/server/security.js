// meteor update --all-packages
// meteor npm update
// snyk test

// /usr/bin/node --inspect /home/george/Desktop/h2io/output/bundle/main.js
// chrome://inspect

import {Meteor} from 'meteor/meteor';

import {BrowserPolicy} from 'meteor/browser-policy';
import {DDPRateLimiter} from 'meteor/ddp-rate-limiter';

const Ajv = require('ajv');

const rateLimit = (type, {properties}) => {
  Object.keys(properties).forEach(name => {
    DDPRateLimiter.addRule(
      {
        name,
        type,
        connectionId: () => true
      },
      5,
      10000
    );
  });
};

// https://chrome.google.com/webstore/detail/csp-evaluator/fjohamlofnakbnbfjkohkbdigoodcejf
// https://themeteorchef.com/tutorials/using-the-browser-policy-package#!
// https://dweldon.silvrback.com/browser-policy
// https://docs.mapbox.com/mapbox-gl-js/overview/

BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowInlineScripts();
BrowserPolicy.content.disallowEval();
BrowserPolicy.content.allowImageOrigin('https://api.mapbox.com');
BrowserPolicy.content.allowOriginForAll('blob:'); // for mapbox-gl
BrowserPolicy.content.allowStyleOrigin('https://stackpath.bootstrapcdn.com');
BrowserPolicy.content.allowStyleOrigin('https://*.tiles.mapbox.com');
BrowserPolicy.content.disallowObject(); // this should be called last

// Prevent the client from editing the 'profile' field in the 'users' collection. See https://guide.meteor.com/accounts.html#dont-use-profile
Meteor.users.deny({
  update() {
    return true;
  }
});

export const ajvMethods = new Ajv();

const systemsMethods = require('../../api/methods/server/schemas/Systems.json');

ajvMethods.addSchema(systemsMethods, 'Systems');

rateLimit('method', systemsMethods);

export const ajvPublications = new Ajv();

const systemsPublications = require('../../api/publications/schemas/Systems.json');

ajvPublications.addSchema(systemsPublications, 'Systems');

rateLimit('subscription', systemsPublications);
rateLimit('subscription', {properties: {roleassignment: null}}); // also protect the roleassignment publication, that has no args and schema

// Get a list of all accounts methods by running `Meteor.server.method_handlers` in meteor shell
const AUTH_METHODS = [
  'login',
  'logout',
  'logoutOtherClients',
  'getNewToken',
  'removeOtherTokens',
  'configureLoginService',
  'changePassword',
  'forgotPassword',
  'resetPassword',
  'verifyEmail',
  'createUser'
];

AUTH_METHODS.forEach(name => {
  DDPRateLimiter.addRule(
    {
      name,
      connectionId: () => true
    },
    2,
    5000
  );
});

// // From https://www.slideshare.net/FabianKromer/rate-limiting-in-meteor-core
