#!/usr/bin/env node
var miniHarp = require("mini-harp");
var app = miniHarp();

var port = 4000;

var argv = require("minimist")(process.argv.slice(2));
if (argv["port"]) {
  port = argv["port"];
}

console.log("Starting mini-harp on http://localhost:" + port);
app.listen(port);
