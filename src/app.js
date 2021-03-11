const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocde');
const foreCast = require('./utils/foreCast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, `../public`);
const viewsPath = path.join(__dirname, '../views/templates');
const partialsPath = path.join(__dirname, '../views/partials')


app.set('view engine', 'hbs');
app.set(`views`, viewsPath)
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Gareth'
    });
});

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Page',
        name: 'Gareth'

    })

});

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        name:'Gareth'

    })
});

app.get(`/weather`,(req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        });
    }

    geoCode.geoCode(req.query.address, (error, {lat, lng, location}={})=>{

        if(error){
            return res.send({error});
        }

        foreCast.forecast(lat, lng,(error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address});
        });

    });
    // res.send( 
    //     {
    //         forcast: 'Sunny',
    //         location: 'Ivanka Pri Nitre',
    //         address: req.query.address
    //     });
});

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: `You must provide a "search" term in the link above please...`
        });
    } 

        res.send({
            products: [],
        });


});

app.get('/help/*', (req,res)=>{
    res.send('This is not part of help directory...')

});

app.get('*',(req,res)=>{

    res.send('Ya done fucked up, 404')
});

app.listen(port, ()=>{
    console.log(`server is up on port 3000...`)
});