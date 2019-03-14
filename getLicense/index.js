var request = require('request');
var _ = require('lodash');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var btoa = require('btoa');

groupNames = ["jira-administrators", "jira-software-users"]
groupNoLicense = "JIRA Group CH Unlicensed Users"
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
 user = event.user
 username = user
 baseu = (event.origin) ? event.origin : "http://testjira.oskar-ruegg.com";
 console.log("user: ",user)
 url = baseu+"/rest/api/2/user?username="+username+"&expand=groups"
 console.log(url)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText)
            userJson = JSON.parse(xhttp.responseText)
            if(userJson.groups.items.length>0) {
              items = userJson.groups.items
              // console.log(items)
              obj = items.find(o => o.name === "jira-software-users")
              res = items.map(a => a.name);
              var containsAlle = res.filter(function(item){
                return typeof item == 'string' && item.indexOf("-ALL") > -1;            
              });
              if(!res.includes("jira-administrators") && !res.includes("jira-software-users") && !res.includes(groupNoLicense) && containsAlle.length>0) {
                console.log("Is neither admin, nor user... activate and reload")
                urlactivate = baseu+"/rest/api/2/group/user?groupname=jira-software-users"
               console.log("urlactivate: ",urlactivate)
request.post({
          headers: {'Content-Type' : 'application/json' },
          url:     urlactivate,
          timeout: 10000, 
          json: { "name": username }
}, function (error,response,body) {
console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
                  setTimeout(function() { callback(null, "YES"); }, 500);
}).auth('techuser', 'techuser', true);
                var xactivate = new XMLHttpRequest();
                xactivate.open("POST", urlactivate, true);
    		xactivate.onreadystatechange = function(error, response, body) {
/*
                  console.log("error: ",error)
                  console.log("body: ",body)
                  console.log("response: ",response)
                  console.log("responseText: ",xactivate.responseText)
*/
                  setTimeout(function() { callback(null, "YES"); }, 500);
                }
                xactivate.setRequestHeader("Content-type", "application/json");
                xactivate.setRequestHeader( 'Authorization', 'Basic ' + btoa( "techuser" + ':' + "techuser" ) )
                console.log("payload: ",JSON.stringify({ "name": username }))
                xactivate.send(JSON.stringify({ "name": username }));
              } else {
                if(res.includes("jira-administrators")) {
                  console.log("is admin, no need to provide license")
                } else if(res.includes("jira-software-users")) {
                  console.log("is user, no need to provide license")
                } else if(res.includes(groupNoLicense)) {
                  console.log("'"+groupNoLicense+"' - this user should not receive a license...")
                } else if(!containsAlle.length>0) {
                  console.log("no *-ALL* group - therefore an external user, that shall not get a license")
/*
                  console.log("res",res)
                  console.log(res.includes("*-ALL*"))
                  console.log("containsAlle",containsAlle)
                  console.log("containsAlle.length",containsAlle.length)
*/
                } else {
                  console.log("cannot add license - reason unknown")
                }
                callback(null, "NO");
              }
            }  
            setTimeout(function() { callback(null, "NO Groups Found"); }, 500);
       }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader( 'Authorization', 'Basic ' + btoa( "techuser" + ':' + "techuser" ) )
    xhttp.send();

}
