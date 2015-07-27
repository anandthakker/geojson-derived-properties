#!/usr/bin/env node
var area = require('turf-area')
var geojsonStream = require('geojson-stream')
var through = require('through2')

module.exports = addDerivedProperties

function addDerivedProperties (feature) {
  if (Array.isArray(feature)) {
    return feature.map(addDerivedProperties)
  }
  if (feature.type === 'FeatureCollection') {
    return addDerivedProperties(feature.features)
  }

  if (feature.geometry.type === 'Polygon') {
    feature.properties['area'] = area(feature)
  }

  return feature
}

process.stdin
  .pipe(geojsonStream.parse())
  .pipe(through.obj(write))
  .pipe(geojsonStream.stringify())
  .pipe(process.stdout)

function write (data, enc, next) {
  this.push(addDerivedProperties(data))
  next()
}
