import react from 'react';

export default function Facebook() {

    const callFace = () => {
           FB.api(
        '/105289518528554/feed',
        'POST',
        {"message":"hello, ovo je drugi post"},
        function(response) {
            console.log('fejs je ovo')
        }
      );
    }
 


    return (
        <div className = "facebook">
            <button onClick = {() => callFace()}>Facebook call</button>
        </div>
    )
}






