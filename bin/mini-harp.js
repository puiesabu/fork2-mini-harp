#!/usr/bin/env node
var miniHarp = require("mini-harp");

var port = 4000;
var path = process.argv[2] != "--port" ? process.argv[2] : process.cwd();

var argv = require("minimist")(process.argv.slice(2));
if (argv["port"]) {
  port = argv["port"];
}

console.log("Starting mini-harp on http://localhost:" + port);
var app = miniHarp(path);
app.listen(port);
