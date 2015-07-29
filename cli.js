#!/usr/bin/env node
var geojsonStream = require('geojson-stream')
var through = require('through2')
var addDerivedProperties = require('./')
var argv = require('yargs')
  .usage('cat foo.geojson | $0 -p area perimeter length > foo-with-geom-props.geojson')
  .default('properties', ['area', 'perimeter', 'length'])
  .array('properties')
  .alias('properties', 'p')
  .help('help')
  .alias('help', 'h')
  .argv

var props = {}
argv.properties.forEach(function (p) { props[p] = true })

process.stdin
  .pipe(geojsonStream.parse())
  .pipe(through.obj(write))
  .pipe(geojsonStream.stringify())
  .pipe(process.stdout)

function write (data, enc, next) {
  this.push(addDerivedProperties(props, data))
  next()
}
