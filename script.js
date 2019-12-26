$(document).ready(function () {

    $('#button-addon2').on('click', function (event) {
        event.preventDefault()

        let city = searchterm.value
        const queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=79b9010c856142d3dabc51dccb05cdb8'


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            let temperature = (response.main.temp - 273) * 1.8 + 32
            let temp = temperature.toFixed(2)
            let lat = response.coord.lat
            let lon = response.coord.lon
            let countryCode = response.sys.country
            var today = new Date();
            var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
            
            console.log(response)
            //populating info for current city info
            $('#temp').text('Temperature: ' + temp + ' degrees');
            $('#humidity').text("Humidity: " + response.main.humidity + '%')
            $('#wind').text('Wind Speed: ' + response.wind.speed + ' mph')
            $('#city-name').text(searchterm.value.toUpperCase() + ' ' + date )

            //UV Index Function for current city UV info
            const uvURL = 'http://api.openweathermap.org/data/2.5/uvi?appid=79b9010c856142d3dabc51dccb05cdb8&lat=' + lat + '&lon=' + lon
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response) {
                $('#uv').text('UV Index: ' + response.value)
            })

            // start 5b day forecast population
            const fivedayURL = 'http://api.openweathermap.org/data/2.5/forecast?appid=79b9010c856142d3dabc51dccb05cdb8&q=' + city + ',' + countryCode
            
            $.ajax({
                url: fivedayURL,
                method: 'GET'
            }).then(function (response) {
               
                for (let i = 0; i < 6; i++){
                    let temps = (response.list[i].main.temp - 273) * 1.8 + 32
                    let ftemps = temps.toFixed(2)
                    var dateF = (today.getMonth() + 1) + '/' + (today.getDate() + i) + '/' + today.getFullYear();
                    $('#date' + [i]).html(dateF)               
                    $('#icon' + [i]).html('<img src=http://openweathermap.org/img/wn/' + response.list[i].weather[0].icon +'@2x.png>')
                    $('#day' + [i]).html("Temp: " + ftemps)
                    $('#humidity' + [i]).html("Humidity: " + response.list[i].main.humidity)
                   
                }
            })

        });

    });
})