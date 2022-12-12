"use strict";

const container = document.querySelector("main .container");
const exampleBtn = document.getElementById("example-btn");
const locationBtn = document.getElementById("location-btn");

const options = {
    enableHighAccuracy: true
};

let isFlying = false;

function getCurrentPosition(successCallback) {
    navigator.geolocation.getCurrentPosition(successCallback, errorHandler, options);
}

function errorHandler(error) {
    console.error(error.message);
}

window.addEventListener("load", function() {
    if (navigator.geolocation) {
        let map;
        let userMarker;
        let isFlying = false;

        getCurrentPosition(position => {
            mapboxgl.accessToken = "pk.eyJ1IjoibWtvcnpoYW4iLCJhIjoiY2xiZ3JvN3kxMGl6YTN3cXNwejI0YnpnNSJ9.LcyAT6lXudjiJnwDKqbRfA";

            const { latitude, longitude } = position.coords;

            map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v12",
                center: [longitude, latitude],
                zoom: 13,
                pitch: 30
            });

            userMarker = new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(map);
        });

        locationBtn.addEventListener("click", function() {
            if (isFlying)
                return;

            isFlying = true;
            locationBtn.style.display = "none";

            map.once("moveend", function() {
                isFlying = false;
                locationBtn.style.display = "revert";
            });

            map.flyTo({
                center: userMarker.getLngLat(),
                zoom: 13,
                pitch: 30,
                speed: 0.5
            });
        });
    }
});

exampleBtn.addEventListener("click", function() {
    container.scrollIntoView({
        behavior: "smooth",
        block: "center"
    })
})