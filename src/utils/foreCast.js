const request = require('postman-request');

const forecast = (lat, lng, callBack) =>{
    const url = `http://api.weatherstack.com/current?access_key=48c697611966f65e9bb65a207fab4a76&query=${lat},${lng}`;
//${lat},${lng}
    request(url, (error, response)=>{
        const data = error || JSON.parse(response.body);

        if(error === data){
           callBack(`Can't connect`)
        }else if(data.error){
            callBack(`${data.error.info}`, undefined)
        }else{
            callBack(undefined,{
                description: data.current.weather_descriptions[0],
                temperature: data.current.temperature,
                feelsLike: data.current.feelslike
            });

        }
       
    });

};

module.exports = {
    forecast: forecast
}
