// ** I18N
//domain="testjira.oskar-ruegg.com"
//baseu="http://"+domain
baseu=jQuery(".hidden.parameters input[title=baseURL]").val()

var waitForEl = function(selector, negative, callback) {
  if ((jQuery(selector).length && !negative) || (!jQuery(selector).length && negative)) {
    callback();
  } else {
    setTimeout(function() {
      waitForEl(selector, negative, callback);
    }, 200);
  }
};

cnt=0;
setTimeout(function () {
  waitForEl("#dashboard-content", false, getLicense())
  if(cnt==0) waitForEl(".aui-message.error", false, getLicense())
}, 2000);

function deleteAllCookies() {
    // console.log("cookie before:", document.cookie)
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    // console.log("cookie after:",document.cookie)
}


function getLicense() {
 cnt++
 if(cnt>1) return false;
 cookie=document.cookie
 console.log("cookie before:", document.cookie)
 username=jQuery("meta[name=loggedInUser]").attr("content")
 if(username==undefined) {
   // console.log("yes")
   username=jQuery("meta[name=ajs-remote-user]").attr("content")
 }
 if(username=="" || username==undefined) {
   // console.log("yes2")
   // console.log(jQuery("input[id=login-form-username]").attr("value"))
   username=jQuery("input[id=login-form-username]").attr("value")
   // console.log(username)
 }
 console.log("user",username)
 if(username=="" || username==undefined) return false;
 url = baseu+"/rest/api/2/user?username="+username+"&expand=groups"
 // console.log(url)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
            // console.log(xhttp.responseText)
            userJson = JSON.parse(xhttp.responseText)
            if(userJson.groups.items.length>0) {
              items = userJson.groups.items
              // console.log(items)
              obj = items.find(o => o.name === "jira-software-users")
              res = items.map(a => a.name);
              if(!res.includes("jira-administrators") && !res.includes("jira-software-users")) {
                console.log("Is neither admin, nor user... activate and reload")
                urlactivate = baseu+"/rest/api/2/group/user?groupname=jira-software-users"
                var xactivate = new XMLHttpRequest();
                xactivate.open("POST", urlactivate, true);
    		xactivate.onreadystatechange = function() {
                  document.cookie=""; 
                  deleteAllCookies();
                  document.cookie=cookie;
                  console.log("cookie after:",document.cookie)
                  setTimeout(function () { window.location.href = "/" }, 3000);
                }
                xactivate.setRequestHeader("Content-type", "application/json");
		xactivate.withCredentials = false;
                xactivate.setRequestHeader( 'Authorization', 'Basic ' + btoa( "techuser" + ':' + "techuser" ) )
                xactivate.send(JSON.stringify({ "name": username }));
              } else {
                console.log("is either admin or user")
              }
            }
       }
    };
    xhttp.open("GET", url, true);
    xhttp.withCredentials = false;
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader( 'Authorization', 'Basic ' + btoa( "techuser" + ':' + "techuser" ) )
    xhttp.send();

}



// Calendar EN language
// Author: Mihai Bazon, <mihai_bazon@yahoo.com>
// Encoding: any
// Distributed under the same terms as the calendar itself.

// For translators: please use UTF-8 if possible.  We strongly believe that
// Unicode is the answer to a real internationalized world.  Also please
// include your contact information in the header, as can be seen above.

// full day names
Calendar._DN = new Array
("Sunday",
 "Monday",
 "Tuesday",
 "Wednesday",
 "Thursday",
 "Friday",
 "Saturday",
 "Sunday");

// Please note that the following array of short day names (and the same goes
// for short month names, _SMN) isn't absolutely necessary.  We give it here
// for exemplification on how one can customize the short day names, but if
// they are simply the first N letters of the full name you can simply say:
//
//   Calendar._SDN_len = N; // short day name length
//   Calendar._SMN_len = N; // short month name length
//
// If N = 3 then this is not needed either since we assume a value of 3 if not
// present, to be compatible with translation files that were written before
// this feature.

// short day names
Calendar._SDN = new Array
("Sun",
 "Mon",
 "Tue",
 "Wed",
 "Thu",
 "Fri",
 "Sat",
 "Sun");

// First day of the week. "0" means display Sunday first, "1" means display
// Monday first, etc.
Calendar._FD = 0;

// full month names
Calendar._MN = new Array
("January",
 "February",
 "March",
 "April",
 "May",
 "June",
 "July",
 "August",
 "September",
 "October",
 "November",
 "December");

// short month names
Calendar._SMN = new Array
("Jan",
 "Feb",
 "Mar",
 "Apr",
 "May",
 "Jun",
 "Jul",
 "Aug",
 "Sep",
 "Oct",
 "Nov",
 "Dec");

// tooltips
Calendar._TT = {};
Calendar._TT["INFO"] = "About the calendar";

Calendar._TT["ABOUT"] =
"DHTML Date/Time Selector\n" +
"(c) dynarch.com 2002-2005 / Author: Mihai Bazon\n" + // don't translate this this ;-)
"For latest version visit: http://www.dynarch.com/projects/calendar/\n" +
"Distributed under GNU LGPL.  See http://gnu.org/licenses/lgpl.html for details." +
"\n\n" +
"Date selection:\n" +
"- Use the \xab, \xbb buttons to select year\n" +
"- Use the " + String.fromCharCode(0x2039) + ", " + String.fromCharCode(0x203a) + " buttons to select month\n" +
"- Hold mouse button on any of the above buttons for faster selection.";
Calendar._TT["ABOUT_TIME"] = "\n\n" +
"Time selection:\n" +
"- Click on any of the time parts to increase it\n" +
"- or Shift-click to decrease it\n" +
"- or click and drag for faster selection.";

Calendar._TT["PREV_YEAR"] = "Prev. year (hold for menu)";
Calendar._TT["PREV_MONTH"] = "Prev. month (hold for menu)";
Calendar._TT["GO_TODAY"] = "Go Today";
Calendar._TT["NEXT_MONTH"] = "Next month (hold for menu)";
Calendar._TT["NEXT_YEAR"] = "Next year (hold for menu)";
Calendar._TT["SEL_DATE"] = "Select date";
Calendar._TT["DRAG_TO_MOVE"] = "Drag to move";
Calendar._TT["PART_TODAY"] = " (today)";

// the following is to inform that "%s" is to be the first day of week
// %s will be replaced with the day name.
Calendar._TT["DAY_FIRST"] = "Display %s first";

// This may be locale-dependent.  It specifies the week-end days, as an array
// of comma-separated numbers.  The numbers are from 0 to 6: 0 means Sunday, 1
// means Monday, etc.
Calendar._TT["WEEKEND"] = "0,6";

Calendar._TT["CLOSE"] = "Close";
Calendar._TT["TODAY"] = "Today";
Calendar._TT["TIME_PART"] = "(Shift-)Click or drag to change value";

// date formats
Calendar._TT["DEF_DATE_FORMAT"] = "%Y-%m-%d";
Calendar._TT["TT_DATE_FORMAT"] = "%a, %b %e";

Calendar._TT["WK"] = "wk";
Calendar._TT["TIME"] = "Time:";

// local AM/PM designators
Calendar._TT["AM"] = "AM";
Calendar._TT["PM"] = "PM";
Calendar._TT["am"] = "am";
Calendar._TT["pm"] = "pm";

