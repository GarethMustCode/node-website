console.log(`JS file is loaded successfully...`);



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#message-1');
const msg2 = document.querySelector('#message-2');
const msg3 = document.querySelector('#message-3');
const weatherIcon = document.querySelector('#weatherIcon');

msg1.textContent = `From Javascript`;
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value

    msg1.textContent = `Loading...`;
    msg2.textContent = ``;
    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
        }else{
            console.log(`From js side, client side...`)
            console.log(data);
            weatherIcon.src = data.forecast.weatherIcon;
            msg1.textContent = `Location: ${data.location}`;
            msg3.textContent = `Temperature: ${data.forecast.temperature}, but feels like: ${data.forecast.feelsLike}`;
            msg2.textContent = `Forecast: ${data.forecast.description}`;

        }
    });
});

});