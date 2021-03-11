const request = require('postman-request');
const geoCode = (address, callBack)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ2FyZXRoLW1hdCIsImEiOiJja20xa2IwcmwxdTY2MnVyenB1Mml3YzE1In0.gB0CFW3X1AHpU91hu3V13w&limit=1`;

    request(url, (error, response)=>{
        
        //const data = error || JSON.parse(response.body) ;
        const {message, features} = error || JSON.parse(response.body) ;
        
        if(error){
            callBack(`Unable to connect to the service...`, undefined);

        }else if(message || features.length === 0){
            callBack(`Unable to find location, try another search...`,undefined);

        }else{
            callBack(undefined, {
                lat: features[0].center[1],
                lng: features[0].center[0],
                location: features[0].place_name
            })
        }

    });

};
module.exports = {
    geoCode:geoCode

}