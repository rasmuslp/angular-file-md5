# AngularFileMD5
AngularJS service for calculating MD5 hashes of files.

### Dependencies
- [AngularJS](https://angularjs.org)
- [SparkMD5](https://github.com/satazor/SparkMD5)

### Communication

- If you **need help** or you would like to **ask a general question**, use [Stack Overflow](https://stackoverflow.com/questions/tagged/angular-file-md5). Tag with `angular-file-md5`.
- If you **found a bug**, open an [issue](https://github.com/rasmuslp/angular-file-md5/issues) and set the tag `bug`.
- If you **have a feature request**, open an [issue](https://github.com/rasmuslp/angular-file-md5/issues) and set the tag `feature request`.
- If you **want to contribute**, submit a pull request.

## Quick start

### Installation
Pick one of the below:
* Through [Bower](http://bower.io): `$ bower install angular-file-md5 --save`
* Through [NPM](https://www.npmjs.com): `$ npm install angular-file-md5 --save`

Include the required libraries:

```html
<script src="components/spark-md5/spark-md5.js"></script>
<script src="components/angular/angular.js"></script>
<script src="components/angular-file-md5/angular-file-md5.js"></script>
```

Inject the `ljungmann.fileMd5` module into your app:

```javascript
angular.module('yourApp', ['ljungmann.fileMd5']);
```

### Configuration

By default, a chunk size of 2 MB is used when reading a file. This can be changed by configuring the service through the provider. The chunk size unit is bytes.

```javascript
angular.module('yourApp')
	.config(['fileMd5ServiceProvider', function(fileMd5ServiceProvider) {
		fileMd5ServiceProvider.configure({
			chunkSize: <noBytes>
		});
	}]);
```

### Usage

To hash a file, simply pass a file (from e.g. a select or a drop) to the service. The service returns a promise that will either be resolved or rejected, should an error occur. Progress is will fire once for each chunk completed.

```javascript
angular.module('yourApp')
	.controller('yourController', ['fileMd5Service', function(fileMd5Service) {
		this.hashFile = function(file) {
			fileMd5Service.md5(file)
			.progress(function(stats) {
				console.log('Hashed ' + stats.loaded + ' B out of ' + stats.total + ' B');
			})
			.error(function(error) {
				console.log('Error calculating md5: %o', error);
			}).success(function(md5sum) {
				console.log('MD5 for ' + file.name + ' is ' + md5sum);
			});
		};
	}]);
```

## License

	The MIT License (MIT)

	Copyright (c) 2015 Rasmus Ljungmann Pedersen

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
