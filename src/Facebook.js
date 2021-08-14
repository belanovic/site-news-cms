import react from 'react';
import FB from 'fb';


export default function Facebook() {

    function callFace () {
        console.log(FB)
           FB.api(
        '/105289518528554/feed',
        'POST',
        {"message":"hello, ovo je drugi post"},
        function(response) {
            console.log('odgovor u slucaju greske')
        }
      );
    }
    return (
        <div className = "facebook"> 
            <button onClick = {() => callFace()}>Facebook call</button>
        </div>
    )
}






