var axios = require('axios');
var objectURL;

// function getPictaculousObject (image) {
//     return axios.get('http://pictaculous.com/api/' + image)
//         .then(function (complementaryObject) {
//             return complementaryObject;
//         });
// }

module.exports = {
    fetchPictaculousObject: function (image) {
        
        
        fetch(image).then(function(response) {
            return response.blob();
        }).then(function(myBlob) {
            objectURL = URL.createObjectURL(myBlob);
            var encodedURI = window.encodeURI = ('//pictaculous.com/api/1.0/assets/imageAlex01.jpg');
            console.log(encodedURI);
            return axios.post(encodedURI)
                .then(function(response) {
                    return response;
                });
        })
        console.log(objectURL);
        
        
    }
};