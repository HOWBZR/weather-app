$(document).ready(function () {

    $('#button-addon2').on('click', function (event) {
        event.preventDefault()

        let city = searchterm.value
        const queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=79b9010c856142d3dabc51dccb05cdb8'


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            let temperature = (response.main.temp - 273) * 1.8 + 32
            let temp = temperature.toFixed(2)
            let lat = response.coord.lat
            let lon = response.coord.lon
            let countryCode = response.sys.country
            

            //populating info for current city info
            $('#temp').text('Temperature: ' + temp + ' degrees');
            $('#humidity').text("Humidity: " + response.main.humidity + '%')
            $('#wind').text('Wind Speed ' + response.wind.speed + ' mph')
            $('#city-name').text(searchterm.value)

            //UV Index Function for current city UV info
            const uvURL = 'http://api.openweathermap.org/data/2.5/uvi?appid=79b9010c856142d3dabc51dccb05cdb8&lat=' + lat + '&lon=' + lon
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response) {
                $('#uv').text('UV Index: ' + response.value)
            })


            const fivedayURL = 'http://api.openweathermap.org/data/2.5/forecast?appid=79b9010c856142d3dabc51dccb05cdb8&q=' + city + ',' + countryCode
            
            $.ajax({
                url: fivedayURL,
                method: 'GET'
            }).then(function (response) {
                
                
                for (let i = 0; i < 6; i++){
                    console.log(response.list[i].main.temp)
                    
                    $('#day'+[i]).html(response.list[i].main.temp)
                   
                }
            })

        });

    });
})