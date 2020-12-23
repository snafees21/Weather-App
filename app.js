

window.addEventListener('load', ()=>{ //after page loads, this function will run
    let long, lat, today, date, time, suffix, hours, twelveHrTime;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection  = document.querySelector('.temperature');    
    let dateTime = document.querySelector('.currentdateandtime');
    const temperatureSpan = document.querySelector('.temperature span');
    


    if(navigator.geolocation){ //if this location exists, get exact position of the user
        navigator.geolocation.getCurrentPosition (position => {
            //console.log(position); //getting coordinates 
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const proxy = "http://cors-anywhere.herokuapp.com/";

            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            
            fetch(api).then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {temperature, summary, icon } = data.currently;
                //Set DOM elements from the api
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //formula for celsius
                let celsius = (temperature - 32) * (5 / 9);
                //Set Icon
                setIcons(icon, document.querySelector('.icon'));

                //Change temp to celsius/fahrenheit
                temperatureSection.addEventListener('click', ()=>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = temperature;
                    }
                });

                //time
                today = new Date();
                date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
                
               // time = today.getHours() + ":" + today.getMinutes();               
                twelveHrTime= today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

                dateTime = date +' '+ twelveHrTime;
                document.getElementById("currentdateandtime").innerHTML = dateTime;    
                
                    
            });
        });
    }

    function setIcons(icon,iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }


});
