import react, {useEffect} from 'react';


export default function Facebook() {

    useEffect(function() {
        window.fbAsyncInit = function() {
          window.FB.init({
            appId            : '623982548570883',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v11.0'
          });
      
          // Now that we've initialized the JavaScript SDK, we call
          // FB.getLoginStatus().  This function gets the state of the
          // person visiting this page and can return one of three states to
          // the callback you provide.  They can be:
          //
          // 1. Logged into your app ('connected')
          // 2. Logged into Facebook, but not your app ('not_authorized')
          // 3. Not logged into Facebook and can't tell if they are logged into
          //    your app or not.
          //
          // These three cases are handled in the callback function.
          window.FB.getLoginStatus(function(response) {
            this.statusChangeCallback(response);
          }.bind(this));
        }.bind(this);
      
        // Load the SDK asynchronously
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }, []) 
    
    

    function callFace () {
        window.FB.api(
        '/105289518528554/feed?&access_token={EAAI3gkInUwMBADIweRRlOf3J5ZBZB5JsaPwo7a1zZB7OsyLo2LRFvgssv4eCkIwNIB8UuXz5qIZATuGRO6F92hobTAmuQZAZAOc6mx4DyifZCLvwQnqpDOQ4oRlKOJA4rif6zMU3GibRF1RtZA7W4ixnHXQUpqZAcA5TkEZC6nvePT3huYrwkn3FhmjWZCRRP2cv6YL0WAho6Aa90I4QlT0zPChCsIRIrNVOJUmGjKCVJ7ZC7toRn3KbDVTTMvqcR37TBzEZD}',
        'POST',
        {"message":"hello, ovo je post iz cms-a"},  
        function(response) {
            console.log(response)
        }
      );
    }
    return (
        <div className = "facebook"> 
            <button onClick = {() => callFace()}>Facebook call</button>
        </div>
    )
}






