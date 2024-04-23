#!/usr/bin/node
const request = require('request');

function getStarWarsMovieTitle(movieId) {
	const url = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;
	return new Promise((resolve, reject) => {
		request(url, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				resolve(JSON.parse(body).title);
			} else {
				reject(new Error(`Error: Unable to fetch movie with id ${movieId}. Received status code ${response.statusCode}.`));
			}
		});
	});
}

if (process.argv.length === 3) {
	const movieId = parseInt(process.argv[2]);
	getStarWarsMovieTitle(movieId)
		.then(movieTitle => console.log(movieTitle))
		.catch(error => console.error(error.message));
} else {
	console.error('Error: Please provide a movie ID as a command line argument.');
}
