var request = require('request');
var _ = require('lodash');

// rootUrl = "http://devjira.oskar-ruegg.com"
rootUrl = "http://testjira.oskar-ruegg.com"
groupNames = ["jira-administrators", "jira-software-users"]
licensedUsers = ["grehae", "aarfri", "rip", "patrie", "tobmey", "mickol", "techuser", "Import"]
var urls = [];
var users = [];
maxUsers = 60
licenseSize = 100
ctr = 0
uctr = 0
testMode = true;

var prettyjson = require('prettyjson'); // Un-uglify JSON output
 
exports.handler = (event, context, callback) => {
  console.log("yes...")
      callback(null, 'Script Successful');
}
