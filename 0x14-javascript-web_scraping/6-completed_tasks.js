#!/usr/bin/node
const request = require('request');

if (!Object.fromEntries) {
	Object.fromEntries = function(entries) {
		return entries.reduce(function(obj, [key, value]) {
			obj[key] = value;
			return obj;
		}, {});
	};
}

request(process.argv[2], function (error, response, body) {
	if (!error) {
		const todos = JSON.parse(body);
		let completed = {};

		todos.forEach((todo) => {
			if (todo.completed) {
				if (completed[todo.userId] === undefined) {
					completed[todo.userId] = 1;
				} else {
					completed[todo.userId]++;
				}
			}
		});

		console.log(Object.fromEntries(Object.entries(completed)));
	}
});
