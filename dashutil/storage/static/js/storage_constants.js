// storage_constants.js - holds constants that will not change
'use strict';


// Storage constants
const STORAGE_CONSTANTS = new function() {
    this.uploadField =          document.getElementById("submit-file-id");
    this.uploadButton =         document.getElementById("submit-button-id");
    this.tableId   =            document.getElementById("table-id");
    this.tableBody =            this.tableId.getElementsByTagName('tbody')[0];
    this.prevClass =           	"prev";
    this.expandedClass =       	"expanded";
    this.collapsedClass =      	"collapsed";
    this.darkThemeClass =      	"dark-theme";
    this.lightThemeClass =     	"light-theme";  
    this.imgPath =             	"/static/img/"; 
};
