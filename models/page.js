 /**
  * @param pageName {string} Name of the page (unique text ID)
  * @param title {string?} Title of the page
  * @param properties {{string:*}} Properties map for unique properties to the page
  */
 var PageModel = function (pageName, title, properties) {
 	this.pageName = pageName || '';
 	this.title = title || 'UNTITLED';
 	this.properties = properties || {};
 }

 exports.PageModel = PageModel;