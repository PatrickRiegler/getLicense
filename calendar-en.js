var cnt=0;
var waitForEl = function(selector, negative, callback) {
  if ((jQuery(selector).length && !negative) || (!jQuery(selector).length && negative)) {
    
	  try {callback();}
	  catch (e) {getLicense();}
  } else {
    setTimeout(function() {
      waitForEl(selector, negative, callback);
    }, 200);
  }
};

setTimeout(function () {
  waitForEl("#dashboard-content", false, getLicense())
  if(cnt==0) waitForEl(".aui-message.error", false, getLicense())
}, 700);


function getLicense() {
 if(window.location.href.indexOf("servicedesk")==-1) {
   console.log("not on a servicedesk page...")
   return false;
 }
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

 origin = window.location.origin
 console.log("origin",origin)

 jQuery.getScript("https://sdk.amazonaws.com/js/aws-sdk-2.92.0.min.js", function (data, textStatus, jqxhr) {

 (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,"script","https://www.google-analytics.com/analytics.js","ga");

  ga("create", "UA-105697068-1", {"siteSpeedSampleRate": 100});


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
                 Payload: '{ "user" : "'+username+'", "origin" : "'+origin+'" }'
 	};
 		lambda.invoke(params, function(err, data) {
 			if (err) {
 				prompt(err);
			} else {
				console.log("data: ",data.Payload);
				if(data.Payload.toString().indexOf("YES")!=-1) {

ga("set", "dimension1", username);
ga('send', 'pageview', {
  'page': '/getLicense',
  'title': 'getLicense'
});

for(gac=0;gac<5;gac++) {
  ga('send', 'pageview', {
    'page': '/dummyLicensePI'+(gac+1),
    'title': 'dummyLicensePI'+(gac+1)
  });
}

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
					setTimeout(function () { window.location.href = "/" }, 500);
				}
			}
		});



  });

}

