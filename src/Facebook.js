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
let r = await fetch("https://graph.facebook.com/v11.0/105289518528554/feed?message=9999999999&access_token=EAAI3gkInUwMBAMuwLDFSDPdSAwiYGTHBFmzGZCUq3Ytq5FOkg3xZA4IpZCke9p5340E58fdPhgDqiAgvtXCflt8P7mNpjmcd9hdcin1DH07HaZC9OSOVZCGUZCJeb7ZCLLPnRfbDDvbY0BlC17HymLNUx4erbgMSF3NblDLoULFB8y4vBlAfNddZBoJSC04HUZC9osIx6fwGddK7ZA1CYA24cE", {

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






