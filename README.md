# geojson-derived-properties

Add derived properties--area, perimeter, length--to geojson features.

```
npm install geojson-derived-properties
```

## Command Line Usage

```sh
npm install -g geojson-derived-properties

cat foo.geojson | geojson-derived-properties -p area perimeter length > foo-with-geom-props.geojson
```

## Javascript Usage

```javascript
var addDerivedProps = require('geojson-derived-properties')
var myGeoJson = /* your geojson object here */
var withProps = addDerivedProps({
  area: true,
  perimeter: false,
  length: true
}, myGeoJson)
```

## Built With

[Turf.js](http://turfjs.org/)
