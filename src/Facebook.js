import react from 'react';

export default function Facebook() {


    FB.api(
        '/105289518528554/feed',
        'POST',
        {"message":"hello, ovo je drugi post"},
        function(response) {
            // Insert your code here
        }
      );


    return (
        <div className = "facebook">
        </div>
    )
}






