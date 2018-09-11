// ** I18N
var cnt=0;
var waitForEl = function(selector, negative, callback) {
  if ((jQuery(selector).length && !negative) || (!jQuery(selector).length && negative)) {
    callback();
  } else {
    setTimeout(function() {
      waitForEl(selector, negative, callback);
    }, 200);
  }
};

setTimeout(function () {
  waitForEl("#dashboard-content", false, getLicense())
  if(cnt==0) waitForEl(".aui-message.error", false, getLicense())
}, 2000);


function getLicense() {
 cnt++
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

 jQuery.getScript("https://sdk.amazonaws.com/js/aws-sdk-2.92.0.min.js", function (data, textStatus, jqxhr) {
   console.log( textStatus ); // Success
   console.log( jqxhr.status ); // 200
  // Initialize the Amazon Cognito credentials provider
  AWS.config.region = 'eu-central-1'; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
     IdentityPoolId: 'eu-central-1:3dece60e-7418-4d4b-9b81-b964592c8560',
  }); 
 	/// Prepare to call Lambda function
 	lambda = new AWS.Lambda({region: 'eu-central-1', apiVersion: '2015-03-31'});
 	var params = {
 		FunctionName : 'getLicense',
 		InvocationType : 'RequestResponse',
 		LogType : 'None',
                 Payload: '{ "user" : "'+username+'" }'
 	};
 		lambda.invoke(params, function(err, data) {
 			if (err) {
 				prompt(err);
			} else {
				console.log("data: ",data.Payload);
				if(data.Payload.toString().indexOf("YES")!=-1) {
var adiv = jQuery('<div />').appendTo('body');
adiv.attr('id', 'holdy');
jQuery("#holdy").css({
    		"position":"fixed", 
    		"display":"none", 
            "width":"100%", 
            "height":"100%", 
            "top":"0", 
            "left":"0",
            "right":"0",
            "bottom":"0",
            "text-align":"center",
            "color":"white",
            "vertical-align":"middle",
            "line-height":"500px",
            "font-size":"30px",
            "background-color":"rgba(0,0,0,0.5)",
            "z-index":"2",
            "cursor":"pointer"})
jQuery("#holdy").css({"display":"block"})
jQuery("#holdy").html("Sie werden jetzt eingeloggt...")
					setTimeout(function () { window.location.href = "/" }, 1000);
				}
			}
		});



  });

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

