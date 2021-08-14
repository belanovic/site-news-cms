import react, {useEffect} from 'react';


export default function Facebook() {

   /*  useEffect(function() {
        window.fbAsyncInit = function() {
          window.FB.init({
            appId            : '623982548570883',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v11.0'
          });
      
          window.FB.getLoginStatus(function(response) {
            this.statusChangeCallback(response);
          }.bind(this));
        }.bind(this);
      

        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }, []) 
     */
    

     async function callFace () {
 /*        window.FB.api(
        '/105289518528554/feed',
        'POST',
        {"message":"hello, ovo je post iz cms-a"},  
        function(response) {
            console.log(response)
        }
      ); */
let r = await fetch( "https://graph.facebook.com/v11.0/105289518528554/feed?message=30303030303&access_token=EAAI3gkInUwMBAK3KXdU7Oa96bhGOqhpnXQojoZAZAZCCCZBUnHzMUNKR1bL64jRfjdd943GPBiLdW5BZBgQDOZAnKzsSmsyoVOiFTxabCCcUY16GvjS8psdGEtne8iPFBVIvQ6GyrVl62AlC76BtP9XZBJiBBtQNmzQ9sE2QfBWZAFZB5KUsaw3I0Ea5zpvGrVPJuYZBqv20Ab9BtdRgFH60ce", {
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain'
    }
})
console.log(r)
    }
    return (
        <div className = "facebook"> 
            <button onClick = {() => callFace()}>Facebook call</button>
        </div>
    )
}






