### [Live Demo] (http://netmera.com/netmeraJsTest)

# What is that?

[Netmera] (http://netmera.com) is a cloud platform (PaaS) optimized for mobile applications. Netmera offers a cloud based content & data repository. With simple APIs and mobile SDKs it is easy to store, retrieve, search and query data & content on the cloud.

jQuery-Netmera is a JavaScript plugin based on popular jQuery library. With jQuery-Netmera you can use Netmera Rest API via javascript objects and methods. Thus it is easier and more advantageous to use jQuery-Netmera plugin for pure javascript applications, rather than wrapping Netmera Rest API in your application.
One of the intended usage of jQuery-Netmera is for HTML5 applications running both on mobile devices and desktops.
A demo application is also available. Because of [cross-site scripting] (https://developer.mozilla.org/en/http_access_control) limitations in browsers, you can run the demo in modern mobile browsers (such as iPhone Safari). Developers are free to copy and use the code in their applications.

# Usage

	<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="http://netmera.com/netmeraJsTest/jquery-netmera-1.0.js"></script>
	<script type="text/javascript">
		var _netmeraObj = new netmera();
		_netmeraObj.init("<your api key>");
	</script>

## Content Context Object

Storing content in Netmera mobile service is done by creating ContentContext object which contains key-value pairs of data.

## Content Service Ojbect

ContentService object is used to retrieve content by its search and get methods. Many query options defined to help finding exact object easily. There are also search methods which get content within the given range of geo-locations.

### Create Content

Following code is used to create content. First, it adds data to the ContentContext object as key-value pairs and then calls the create() method to insert data into Netmera repository.

	var _cc = new _netmeraObj.contentContext("Blog");
	_cc.add("title", "My first blog");
	_cc.add("description", "This is my first blog content.");
	_cc.add("isActive", false);
	_cc.create(function() {
		console.log("Path = " + _cc.getPath());
		console.log("Title = " + _cc.get("title"));
		console.log("Description = " + _cc.get("description"));
		// callback function
	});

### Delete Content

Following code can be used to delete content from the Netmera repository. In order to delete content either set path to find and delete content or first call get() or search() methods and then delete the retrieved ContentContext object.

	var _cc = new _netmeraObj.contentContext("Blog");
	_cc.setPath(“/mobimeracontents/_531913427”);
	_cc.remove(function() {
		// callback function
	});

### Get Content

In order to get the data you need to know the path. In Netmera repository each content has a unique path.

	var _cs = new _netmeraObj.contentService("Blog");
	_cs.setPath(“/mobimeracontents/_531913427”);
	_cs.get(function() {
		console.log("Path = " + _cc.getPath());
		console.log("Title = " + _cc.get("title"));
		console.log("Description = " + _cc.get("description"));
		// callback function
	});

### Search

The following code searches the content and returns the list of ContentContext objects. If you set searchText then it will search the content repository and retrieve the results which contains the searchText. If searchText is not set then it returns all the content that matches with the objectName.

	var _cs = new _netmeraObj.contentService(_objectName);
	_cs.setMax(_max);
	_cs.setPage(_page);
	_cs.setSearchText("first");
	_cs.search(function() {
		var _entries = _cs.getEntries();
		var _totalResults = _cs.getTotalResults();
		$.each(_entries, function(key, val) {
			console.log("Path = " + val.getPath());
			console.log("Title = " + val.get("title"));
			console.log("Description = " + val.get("description"));
			// callback function
		});
	});

### Search and Update

In order to update content, first find content and add data to update as key-value pair and then call update() method.

	var _cs = new _netmeraObj.contentService(_objectName);
	_cs.setMax(_max);
	_cs.setPage(_page);
	_cs.setSearchText("first");
	_cs.search(function() {
		var _entries = _cs.getEntries();
		var _totalResults = _cs.getTotalResults();
		$.each(_entries, function(key, cc) {
			cc.add("title", "Updated Blog title");
			cc.update(function() {
				console.log("Path = " + val.getPath());
				console.log("Title = " + val.get("title"));
				console.log("Description = " + val.get("description"));
				// callback function
			});
		});
	});

### Search Query Options

There are different ways to add options to the ContentService object. They are used to filter contents.

It filters the content whose “name” is “John”.

	_cs.whereEqual(“name”, “John”);
	
It filters the content whose “name” is not “Tom”.

	_cs.whereNotEqual(“name”, “John”);

It filters the content whose “age” is greather than 20.

	_cs.whereGreatherThan(“age”, 20);

It filters the content whose “name” is greather than or equal to 20.

	_cs.whereGreatherThanOrEqual(“age”, 20);
	
It filters the content whose “age” is less than 30.

	_cs.whereLessThan(“age”, 30);
	
It filters the content whose “name” is less than or equal to 30.

	_cs.whereLessThanOrEqual(“age”, 30);

It filters the content which contains “email” key.

	_cs.whereExists(“email”, true);
	
It filters the content which does not contain “email” key.

	_cs.whereExists(“email”, false);

It filters the content whose “name” starts with “J”.

	_cs.whereStartsWith(“name”, “J”);

It filters the content whose “name” is ends with “hn”.

	_cs.whereEndsWith(“name”, “hn”);

Say we have a list of names.
It filters the content whose “name” is any name in the list.	

	var list = new Array();
	list.push(“John”);
	list.push(”Tom”];
	_cs.whereContainedIn(“name”, list);

This method filters the content that matches with the query which contains all of the values in the list above.

	var list = new Array();
	list.push(“John”);
	list.push(”Tom”];
	_cs.whereAllContaintedIn(“name”, list);

You can set the maximum number of results returning from the search() method. Default value is 10.

	_cs.setMax(100);

This is used for the pagination. It skips page*max results and return the max result. For example, if page = 2, and max = 100 then it skips 2*100=200 results and return the 100 results.

	_cs.setPage(2);

# TODO
* Netmera Location Documentation
* Netmera User Documentation