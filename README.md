## React Cubify

Cubify is a React component designed to represent a designated area as a matrix of rotatable cubes. The component accepts four children that are assigned to the front, left, back, and right face of each cube in the matrix. The motion profile consists of row and column size, easing, duration, and displacement among others. The Cubify component simply wraps four children and manages their render states internally. The motion action is accomplished by invoking the cubifyApply() method.

### Features
  * Callbacks for onStart, onReady, onComplete
  * Fully configurable rotate behavior
  * No adjustments to existing HTML/CSS needed
  * Ability to assign a unique child to each cube face (4 faces)

### Learn more
See the demo at [http://www.uismithing.com/main/cubify](http://www.uismithing.com/main/cubify).

### Repository
[https://github.com/uismithing/react-cubify](https://github.com/uismithing/react-cubify)

### Install
`npm install react-cubify -s`

### Deploy
`import Cubify from "react-cubify"`
```html
<Cubify ref="cubifywallpaper" {...cubifyProfile}>
	<div id="cubify-frontpanel-container" className="cubify-frontpanel"></div>
	<div id="cubify-leftpanel-container" className="cubify-leftpanel"></div>
	<div id="cubify-backpanel-container" className="cubify-backpanel"></div>
	<div id="cubify-rightpanel-container" className="cubify-rightpanel"></div>
</Cubify>
```