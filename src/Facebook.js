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
let r = await fetch("https://graph.facebook.com/v11.0/105289518528554/feed?message=1111111111zzzzzzzzyyyyyyyydsdsd&access_token=EAAI3gkInUwMBAJPpcJal1CYvmRePMIE3s26ciCT5tMZCygAB1NrCJwhU6taIe8wytIvZAem2KJIwpyeDZBuXMzEse4jh92rxjat4iO4eeGZCW1THVyAeP1gfoEwe8nt2cRElYwNQKhZAY4NtGZCTweMOJpDwvrZClaAI9Qxdq8jw9AMZAZA8sWHm5tWZBWwHsu61ZCWf902IKbbaU3sQm1jAebZC", {
mode: 'no-cors',
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






