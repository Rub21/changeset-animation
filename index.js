#!/usr/bin/env node
var rp = require('request-promise');
var BlueBirdQueue = require('bluebird-queue');
var fs = require('fs');
var changesetParser = require('real-changesets-parser');
var argv = require('minimist')(process.argv.slice(2));

var options = {
	uri: argv.url,
	headers: {
		'User-Agent': 'Request-Promise'
	},
	json: true
};

const q = new BlueBirdQueue({
	concurrency: 5
});

function getChangesets(options) {
	rp(options)
		.then(function(res) {
			console.log(res.next)
			if (res && res.features) {
				res.features.forEach(feature => {
					var id = feature.id;
					var opts = {
						uri: 'https://s3.amazonaws.com/mapbox/real-changesets/production/' + id + '.json',
						json: true,
						simple: false
					};
					q.add((id) => {
						return rp(opts);
					})
				});
			}
			if (res.next) {
				options.uri = res.next;
				getChangesets(options);
			} else {
				console.log("start downloading the changesets...");
				q.start().then((results) => {
					results.forEach((res) => {
						if (res && res.metadata && res.metadata.id) {
							fs.writeFileSync(res.metadata.id + '.geojson', JSON.stringify(changesetParser(res)))
						}
					});
				}).catch(function(err) {
					console.log(err)
				});
			}
		})
		.catch(function(err) {
			console.log(err)
		});
}

getChangesets(options);