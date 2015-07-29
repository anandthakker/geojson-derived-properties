var area = require('turf-area')
var length = require('turf-line-distance')

module.exports = addDerivedProperties

/**
 * Add area, perimeter, and length properties to geojson features.
 *
 * @param {Object} properties - the properties to add: this should be an object mapping keys 'area', 'perimeter', 'length' to truthy/falsy values
 * @param {Feature|FeatureCollection|Array<Feature>} feature
 * @returns {Feature|FeatureCollection|Array<Feature>}
 */
function addDerivedProperties (properties, feature) {
  if (Array.isArray(feature)) {
    return feature.map(addDerivedProperties.bind(null, properties))
  }
  if (feature.type === 'FeatureCollection') {
    return addDerivedProperties(properties, feature.features)
  }

  if (feature.geometry.type === 'Polygon' ||
  feature.geometry.type === 'MultiPolygon') {
    if (properties.area) feature.properties['area'] = area(feature)
    if (properties.perimeter) feature.properties['perimeter'] = 1000 * length(feature, 'kilometers')
  }

  if (feature.geometry.type === 'LineString' ||
  feature.geometry.type === 'MultieLineString') {
    if (properties.length) feature.properties['length'] = 1000 * length(feature, 'kilometers')
  }

  return feature
}
