(function(){
	'use strict';

	function angularFileMd5(angular, sparkMd5) {
		angular.module('ljungmann.fileMd5', [])
		.provider('fileMd5Service', [function() {

			var settings = {
				chunkSize: 2097152 // 2 MB
			};

			this.configure = function(additionalSettings) {
				angular.extend(settings, additionalSettings);

				return this;
			};

			this.$get = ['$q', function($q) {

				return {
					md5: function(file) {
						var slicer = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
						var currentChunk = 0;
						var chunks = Math.ceil(file.size / settings.chunkSize);

						var spark = new sparkMd5.ArrayBuffer();

						var deferred = $q.defer();
						var promise = deferred.promise;

						var onLoadFn = function(event) {
							spark.append(event.target.result);

							deferred.notify({
								loaded: currentChunk * settings.chunkSize + event.loaded,
								total: file.size
							});

							currentChunk++;
							if (currentChunk < chunks) {
								loadData();
							} else {
								var md5sum = spark.end();
								deferred.resolve(md5sum);
							}
						};

						var onErrorFn = function (error) {
							deferred.reject(error);
						};

						var loadData = function() {
							var fileReader = new FileReader();
							fileReader.onload = onLoadFn;
							fileReader.onerror = onErrorFn;

							var start = currentChunk * settings.chunkSize;
							var end = ((start + settings.chunkSize) >= file.size) ? file.size : start + settings.chunkSize;

							fileReader.readAsArrayBuffer(slicer.call(file, start, end));
						};

						promise.success = function(fn) {
							promise.then(function(md5sum) {
								fn(md5sum);
							});

							return promise;
						};

						promise.error = function(fn) {
							promise.then(null, function(error) {
								fn(error);
							});

							return promise;
						};

						promise.progress = function(fn) {
							promise.then(null, null, function(stats) {
								fn(stats);
							});

							return promise;
						};

						loadData();

						return promise;
					}
				};

			}];

		}]);
	}

	if (typeof define === 'function' && define.amd) {
		define(['angular', 'spark-md5'], angularFileMd5);
	} else if (typeof module !== 'undefined' && module && module.exports) {
		angularFileMd5(require('angular'), require('spark-md5'));
		module.exports = 'ljungmann.fileMd5';
	} else {
		angularFileMd5(angular, (typeof global !== 'undefined' ? global : window).SparkMD5);
	}
})();
