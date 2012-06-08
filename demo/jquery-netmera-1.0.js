/**
 * Copyright 2012 Inomera Research
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * Includes jQuery.js
 * http://jquery.com
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

function netmera() {
	var _netmera = {};
	var _st = null;
	var _defaultParams = {};
	var _exceptions = {};

	var _request = {};
	_request.params = {};
	_request.params.contentActionToken = "contentActionToken";
	_request.params.path = "path";
	_request.params.contentType = "contentType";
	_request.params.contentName = "contentName";
	_request.params.content = "content";
	_request.params.max = "max";
	_request.params.page = "page";
	_request.params.customCondition = "customCondition";
	_request.params.searchText = "searchText";
	_request.params.sortBy = "sortBy";
	_request.params.sortOrder = "sortOrder";
	_request.params.contentPrivacy = "contentPrivacy";
	_request.params.moderationStatus = "moderationStatus";
	_request.params.searchType = "searchType";
	_request.params.fieldName = "fieldName";
	_request.params.latitude = "latitude";
	_request.params.longitude = "longitude";
	_request.params.distance = "distance";
	_request.params.locationSuffix = "_netmera_mobile_loc";
	_request.params.latitudeSuffix = "_netmera_mobile_latitude";
	_request.params.longitudeSuffix = "_netmera_mobile_longitude";
	
	_request.url = "http://netmera.com";
	_request.rpcUrl = "/social/rest";
	_request.post = "POST";
	_request.get = "GET";
	_request.st = "st=";
	_request.actionTokenMethod = "/content/createActionToken?";
	_request.createContentMethod = "/content/createContent?";
	_request.updateContentMethod = "/content/updateContent?";
	_request.removeContentMethod = "/content/deleteContent?";
	_request.searchContentMethod = "/content/search?";
	_request.getContentMethod = "/content/get?";
	_request.locationSearchContentMethod = "/content/locationSearch?";
	
	_exceptions.messages = {
		"EC_IO_EXCEPTION" : "Cannot connect to the server",
		"EC_REQUIRED_FIELD" : " is required",
		"EC_INVALID_REQUEST" : "Invalid request",
		"EC_JSON_PUT_EXCEPTION" : "Error occurred while adding data.",
		"EC_JSON_GET_EXCEPTION" : "Error occurred while getting data.",
		"EC_NULL_EXCEPTION" : "cannot be null",
		"EC_INVALID_DATA_TYPE" : "Data type is invalid",
		"EC_INVALID_DATE_FORMAT" : "Date format must be like yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
	};
	
	function errorCallback(response) {
		throw new Error(response.statusText);
	}

	_defaultParams.serviceName = "netmera-mobimera";
	_defaultParams.parentPath = "/mobimeracontents";
	_defaultParams.contentType = "netmera-mobimera:mobimera";
	_defaultParams.createAction = "netmera-mobimera:create-mobimera";
	_defaultParams.updateAction = "netmera-mobimera:update-mobimera";
	_defaultParams.apiContentType = "netmera-mobimera:api-content-type";
	_defaultParams.privacyType = "public";
	_defaultParams.moderationStatus = "production";
	_defaultParams.circleSearch = "circle";
	_defaultParams.boxSearch = "box";
	
	function search(data, callback) {
		var params = {};
		params.url = _request.url + _request.rpcUrl + _request.searchContentMethod + _request.st + _st;
		params.method = _request.post;
		params.data = {};
		params.data[_request.params.path] = _defaultParams.parentPath;
		params.data[_request.params.contentType] = _defaultParams.contentType;
		params.data[_request.params.customCondition] = data[_request.params.customCondition];
		params.data[_request.params.searchText] = data[_request.params.searchText];
		params.data[_request.params.max] = data[_request.params.max];
		params.data[_request.params.page] = data[_request.params.page];
		params.data[_request.params.sortBy] = data[_request.params.sortBy];
		params.data[_request.params.sortOrder] = data[_request.params.sortOrder];
		
		send(params, function(response) {
			try {
				if (response) {
					if (jQuery.isFunction(callback))
						callback(response);
				} else {
					throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
				}
			} catch (e) {
				throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
			}
		}, errorCallback);
	}
	
	function boxSearch(data, callback) {
		var params = {};
		params.url = _request.url + _request.rpcUrl + _request.locationSearchContentMethod + _request.st + _st;
		params.method = _request.post;
		params.data = {};
		params.data[_request.params.searchType] = _defaultParams.boxSearch;
		params.data[_request.params.fieldName] = data[_request.params.fieldName];
		params.data[_request.params.latitude] = data[_request.params.latitude];
		params.data[_request.params.longitude] = data[_request.params.longitude];
		params.data[_request.params.path] = _defaultParams.parentPath;
		params.data[_request.params.contentType] = _defaultParams.contentType;
		params.data[_request.params.customCondition] = data[_request.params.customCondition];
		params.data[_request.params.searchText] = data[_request.params.searchText];
		params.data[_request.params.max] = data[_request.params.max];
		params.data[_request.params.page] = data[_request.params.page];
		
		send(params, function(response) {
			try {
				if (response) {
					if (jQuery.isFunction(callback))
						callback(response);
				} else {
					throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
				}
			} catch (e) {
				throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
			}
		}, errorCallback);
	}
	
	function circleSearch(data, callback) {
		var params = {};
		params.url = _request.url + _request.rpcUrl + _request.locationSearchContentMethod + _request.st + _st;
		params.method = _request.post;
		params.data = {};
		params.data[_request.params.searchType] = _defaultParams.circleSearch;
		params.data[_request.params.fieldName] = data[_request.params.fieldName];
		params.data[_request.params.latitude] = data[_request.params.latitude];
		params.data[_request.params.longitude] = data[_request.params.longitude];
		params.data[_request.params.distance] = data[_request.params.distance];
		params.data[_request.params.path] = _defaultParams.parentPath;
		params.data[_request.params.contentType] = _defaultParams.contentType;
		params.data[_request.params.customCondition] = data[_request.params.customCondition];
		params.data[_request.params.searchText] = data[_request.params.searchText];
		params.data[_request.params.max] = data[_request.params.max];
		params.data[_request.params.page] = data[_request.params.page];
		
		send(params, function(response) {
			try {
				if (response) {
					if (jQuery.isFunction(callback))
						callback(response);
				} else {
					throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
				}
			} catch (e) {
				throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
			}
		}, errorCallback);
	}
	
	function get(data, callback) {
		var params = {};
		params.url = _request.url + _request.rpcUrl + _request.getContentMethod + _request.st + _st;
		params.method = _request.get;
		params.data = {};
		params.data[_request.params.path] = data[_request.params.path];
		
		send(params, function(response) {
			try {
				if (response && response.entry) {
					if (jQuery.isFunction(callback))
						callback(response.entry);
				} else {
					throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
				}
			} catch (e) {
				throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
			}
		}, errorCallback);
	}
	
	function create(data, callback) {
		actionToken(_defaultParams.serviceName, _defaultParams.parentPath, _defaultParams.createAction, function(actionToken) {
			
			var params = {};
			params.url = _request.url + _request.rpcUrl + _request.createContentMethod + _request.st + _st;
			params.method = _request.post;
			params.data = {};
			params.content = data;
			params.data[_request.params.contentActionToken] = actionToken;
			params.data[_request.params.path] = _defaultParams.parentPath;
			params.data[_request.params.contentType] = _defaultParams.contentType;
			params.data[_request.params.contentName] = Math.floor((Math.random() * 1000) + 1);
			
			send(params, function(response) {
				try {
					if (response && response.entry) {
						if (jQuery.isFunction(callback))
							callback(response.entry);
					} else {
						throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
					}
				} catch (e) {
					throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
				}
			}, errorCallback);
		});
	}
	
	function update(data, callback) {
		var updatePath = data[_request.params.path];
		actionToken(_defaultParams.serviceName, updatePath, _defaultParams.updateAction, function(actionToken) {
			
			var params = {};
			params.url = _request.url + _request.rpcUrl + _request.updateContentMethod + _request.st + _st;
			params.method = _request.post;
			params.data = {};
			params.content = data;
			params.data[_request.params.contentActionToken] = actionToken;
			params.data[_request.params.contentPrivacy] = data[_request.params.contentPrivacy];
			params.data[_request.params.moderationStatus] = data[_request.params.moderationStatus];
			params.data[_request.params.path] = updatePath;
			params.data[_request.params.contentType] = _defaultParams.contentType;
			params.data[_request.params.contentName] = Math.floor((Math.random() * 1000) + 1);
			
			send(params, function(response) {
				try {
					if (response && response.entry) {
						if (jQuery.isFunction(callback))
							callback(response.entry);
					} else {
						throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
					}
				} catch (e) {
					throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
				}
			}, errorCallback);
		});
	}
	
	function remove(path, callback) {
		var params = {};
		params.url = _request.url + _request.rpcUrl + _request.removeContentMethod + _request.st + _st;
		params.method = _request.post;
		params.data = {};
		params.data[_request.params.path] = path;
		
		send(params, function(response) {
			try {
				if (jQuery.isFunction(callback))
					callback();
			} catch (e) {
				throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
			}
		}, errorCallback);
	}
	
	function actionToken(serviceName, path, actionName, callback) {
		var params = {};
		params.url = _request.url + _request.rpcUrl + _request.actionTokenMethod + _request.st + _st;
		params.method = _request.get;
		params.data = {
			"path" : path,
			"service" : serviceName,
			"action" : actionName
		};
		
		send(params, function(response) {
			try {
				if (response && response.entry) {
					if (jQuery.isFunction(callback))
						callback(response.entry.key);
				} else {
					throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
				}
			} catch (e) {
				throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
			}
		}, errorCallback);
	}
	
	function send(params, successCB, errorCB) {
		var req = {
			url : params.url,
			contentType : "application/json",
			dataType : "json",
			type : params.method
		};
		
		if (params.content)
			req.url = req.url + "&" + jQuery.param(params.data) + "&content=" + JSON.stringify(params.content);
		else 
			req.url = req.url + "&" + jQuery.param(params.data);

		$.ajax(req).done(successCB).fail(errorCB);
	}

	function contentContext(objectName) {
		var _contentContext = {};

		var _objectName = objectName;
		var _data = {};
		var _path = {};
		var _content = {};
		var _contentType = {};
		var _owner = {};
		var _privacy = {};
		var _moderationStatus = {};
		
		function setContent(entry) {
			_data = entry.content.data;
			_objectName = entry.content.data[_defaultParams.apiContentType];
			_path = entry.content.path;
			_content = entry.content;
			_contentType = entry.type;
			_owner = entry.owner;
			_privacy = entry.content.privacyTypeName;
			_moderationStatus = entry.content.moderationStatus;
		}
		
		function clearContent() {
			_data = {};
			_objectName = {};
			_path = {};
			_content = {};
			_contentType = {};
			_owner = {};
			_privacy = {};
			_moderationStatus = {};
		}

		_contentContext.add = function(key, val) {
			if (!key)
				throw new Error("key " + _exceptions.messages["EC_NULL_EXCEPTION"]);
			if (!val)
				throw new Error("val " + _exceptions.messages["EC_NULL_EXCEPTION"]);

			try {
				_data[key] = val;
			} catch (e) {
				throw new Error(_exceptions.messages["EC_JSON_PUT_EXCEPTION"]);
			}
		};
		_contentContext.addGeoLocation = function(key, geoPoint) {
			if (!key)
				throw new Error("key " + _exceptions.messages["EC_NULL_EXCEPTION"]);
			if (!geoPoint && !geoPoint.getLatitude() && !geoPoint.getLongitude())
				throw new Error("geoPoint " + _exceptions.messages["EC_NULL_EXCEPTION"]);
			
			try {
				_data[key + _request.params.locationSuffix] = geoPoint.getLatitude() + "," + geoPoint.getLongitude();
				_data[key + _request.params.latitudeSuffix] = geoPoint.getLatitude();
				_data[key + _request.params.longitudeSuffix] = geoPoint.getLongitude();
			} catch (e) {
				throw new Error(_exceptions.message["EC_JSON_PUT_EXCEPTION"]);
			}
		};
		_contentContext.create = function(callback) {
			try {
				_data[_defaultParams.apiContentType] = _objectName;
				create(_data, function(entry) {
					setContent(entry);
					if (jQuery.isFunction(callback))
						callback();
				});
			} catch (e) {
				throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
			}
		};
		_contentContext.update = function(callback) {
			try {
				_data[_defaultParams.apiContentType] = _objectName;
				_data[_request.params.contentPrivacy] = _privacy;
				_data[_request.params.moderationStatus] = _moderationStatus;
				_data[_request.params.path] = _path;
				update(_data, function(entry) {
					setContent(entry);
					if (jQuery.isFunction(callback))
						callback();
				});
			} catch (e) {
				throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
			}
		};
		_contentContext.remove = function(callback) {
			try {
				remove(_path, function() {
					clearContent();
					if (jQuery.isFunction(callback))
						callback();
				});
			} catch (e) {
				throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
			}
		};
		_contentContext.get = function(key) {
			return _data[key];
		};
		_contentContext.getPath = function() {
			return _path;
		};
		_contentContext.setPath = function(path) {
			_path = path;
		};
		_contentContext.getObjectName = function() {
			return _objectName;
		};
		_contentContext.getContent = function() {
			return _content;
		};
		_contentContext.getContentType = function() {
			return _contentType;
		};
		_contentContext.getOwner = function() {
			return _owner;
		};
		_contentContext.init = function(entry) {
			setContent(entry);
		};

		return _contentContext;
	}
	
	function geoLocation(latitude, longitude) {
		var _geoLocation = {};
		var _latitude = latitude;
		var _longitude = longitude;
		
		_geoLocation.getLatitude = function() {
			return _latitude;
		};
		_geoLocation.getLongitude = function() {
			return _longitude;
		};
		
		return _geoLocation;
	}
	
	function contentService(objectName) {
		var _contentService = {};

		var _objectName = objectName;
		var _queries = new Array();
		var _searchText = null;
		var _max = 10;
		var _page = 0;
		var _path = {};
		var _totalResults = {};
		var _entries = new Array();
		var _data = {};
		var _sortBy = {};
		var _sortOrder = "ascending";
		
		function clearEntries() {
			_entries = new Array();
		}
		
		function searchParams(pageParam, maxParam) {
			var customCondition = "{";
			$.each(_queries, function(val) {
				customCondition += val + ",";
			});
			customCondition += "'" + _defaultParams.apiContentType + "' : '" + _objectName + "'}";
			
			_data[_request.params.page] = pageParam;
			_data[_request.params.max] = maxParam;
			_data[_request.params.customCondition] = customCondition;
			
			if (_searchText) {
				_data[_request.params.searchText] = _searchText;
				_data[_request.params.sortBy] = "";
				_data[_request.params.sortOrder] = "";
			} else {
				_data[_request.params.sortBy] = _sortBy;
				_data[_request.params.sortOrder] = _sortOrder;
			}
		}
		
		_contentService.count = function(callback) {
			try {
				searchParams(0, 1);
				
				search(_data, function(response) {
					_totalResults = response.totalResults;
					clearEntries();
					if (jQuery.isFunction(callback))
						callback();
				});
			} catch (e) {
				throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
			}
		};
		_contentService.search = function(callback) {
			try {
				searchParams(_page, _max);
				
				search(_data, function(response) {
					_totalResults = response.totalResults;
					$.each(response.entry, function(key, val) {
						var ctx = new contentContext(val.content.data[_defaultParams.apiContentType]);
						ctx.init(val);
						_entries.push(ctx);
					});
					if (jQuery.isFunction(callback))
						callback();
				});
			} catch (e) {
				throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
			}
		};
		_contentService.boxSearch = function(firstGeoPoint, secondGeoPoint, locationField, callback) {
			try {
				searchParams(_page, _max);
				_data[_request.params.latitude] = firstGeoPoint.getLatitude() + "," + secondGeoPoint.getLatitude();
				_data[_request.params.longitude] = firstGeoPoint.getLongitude() + "," + secondGeoPoint.getLongitude();
				_data[_request.params.fieldName] = locationField + _request.params.locationSuffix;

				boxSearch(_data, function(response) {
					_totalResults = response.totalResults;
					$.each(response.entry, function(key, val) {
						var ctx = new contentContext(val.content.data[_defaultParams.apiContentType]);
						ctx.init(val);
						_entries.push(ctx);
					});
					if (jQuery.isFunction(callback))
						callback();
				});
			} catch (e) {
				throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
			}
		};
		_contentService.circleSearch = function(geoPoint, distance, locationField, callback) {
			try {
				searchParams(_page, _max);
				_data[_request.params.latitude] = geoPoint.getLatitude();
				_data[_request.params.longitude] = geoPoint.getLongitude();
				_data[_request.params.distance] = distance;
				_data[_request.params.fieldName] = locationField + _request.params.locationSuffix;

				circleSearch(_data, function(response) {
					_totalResults = response.totalResults;
					$.each(response.entry, function(key, val) {
						var ctx = new contentContext(val.content.data[_defaultParams.apiContentType]);
						ctx.init(val);
						_entries.push(ctx);
					});
					if (jQuery.isFunction(callback))
						callback();
				});
			} catch (e) {
				throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
			}
		};
		_contentService.get = function(callback) {
			try {
				_data[_request.params.path] = _path;
				get(_data, function(entry) {
					setContent(entry);
					if (jQuery.isFunction(callback))
						callback();
				});
			} catch (e) {
				throw new Error(_exceptions.messages["EC_IO_EXCEPTION"]);
			}
		};
		_contentService.setSortBy = function(sortBy) {
			_sortBy = sortBy;
		};
		_contentService.setSortOrder = function(sortOrder) {
			_sortOrder = sortOrder;
		};
		_contentService.setSearchText = function(searchText) {
			_searchText = searchText;
		};
		_contentService.whereEqual = function(key, value) {
			_queries.push("'" + key + "':'" + value + "'");
		};
		_contentService.whereGreatherThan = function(key, value) {
			_queries.push("'" + key + "': {$gt :'" + value + "'}");
		};
		_contentService.whereLessThan = function(key, value) {
			_queries.push("'" + key + "': {$lt :'" + value + "'}");
		};
		_contentService.whereNotEqual = function(key, value) {
			_queries.push("'" + key + "': {$ne :'" + value + "'}");
		};
		_contentService.whereGreatherThanOrEqual = function(key, value) {
			_queries.push("'" + key + "': {$gte :'" + value + "'}");
		};
		_contentService.whereLessThanOrEqual = function(key, value) {
			_queries.push("'" + key + "': {$lte :'" + value + "'}");
		};
		_contentService.whereExists = function(key, value) {
			_queries.push("'" + key + "': {$exists :'" + value + "'}");
		};
		_contentService.whereMatches = function(key, value) {
			_queries.push("'" + key + "': {$regex :/" + value + "/}");
		};
		_contentService.whereStartsWith = function(key, value) {
			_queries.push("'" + key + "': {$regex :/^" + value + "/}");
		};
		_contentService.whereEndsWith = function(key, value) {
			_queries.push("'" + key + "': {$regex :/" + value + "$/}");
		};
		_contentService.whereContainedIn = function(key, value) {
			_queries.push("'" + key + "': {$in : [" + value + "]}");
		};
		_contentService.whereAllContaintedIn = function(key, value) {
			_queries.push("'" + key + "': {$all : [" + value + "]}");
		};
		_contentService.setMax = function(max) {
			_max = max;
		};
		_contentService.setPage = function(page) {
			_page = page;
		};
		_contentService.getPath = function() {
			return _path;
		};
		_contentService.setPath = function(path) {
			_path = path;
		};
		_contentService.getEntries = function() {
			return _entries;
		};
		_contentService.getTotalResults = function() {
			return _totalResults;
		};

		return _contentService;
	}

	_netmera.init = function(st) {
		_st = st;
	};

	_netmera.contentContext = function(objectName) {
		return contentContext(objectName);
	};

	_netmera.contentService = function(objectName) {
		return contentService(objectName);
	};
	
	_netmera.geoLocation = function(latitude, longitude) {
		return geoLocation(latitude, longitude);
	};

	return _netmera;
}