// storage_handlers.js - handles input events and calls storage.js methods 
// to deal with page direction and displaying messages to users
'use strict';


// keyboard, click, hover, focus, etc event handlers for the storage page
var STORAGE_EVENT_HANDLERS = new function() {

	// Method to call back to upload a new file. Takes storage page name, 
	// file uploaded, and parent directory id as parameters
    this.uploadNewFilesToDirectoryCallback = null;
    
    // Method to call back to create a new directory. Takes storage page name, 
	// file uploaded, and parent directory id as parameters
    this.createNewDirectoryCallback = null;

    // Method to call back to rename a file or file(s). Takes storage page name, 
	// a list of file ids to rename, and the new name as parameters
    this.renameFilesCallback = null;

    // Method to call back to delete a file. Takes storage page name and
    // list of file ids to delete as parameters
    this.deleteFilesCallback = null;
    
    // storage variables
    this.storagePageId = null;
    this.storagePageName = null;
    this.storagePageFields = null;
	
	// Handler to set up event listeners. 1 callback passed in from storage.js
    this.addAllEventListeners = function(newUploadNewFilesToDirectoryCallback, 
            newCreateNewDirectoryCallback, newRenameFilesCallback, 
            newDeleteFilesCallback) {

		this.uploadNewFilesToDirectoryCallback = newUploadNewFilesToDirectoryCallback;
        this.createNewDirectoryCallback = newCreateNewDirectoryCallback;
        this.renameFilesCallback = newRenameFilesCallback;
        this.deleteFilesCallback = newDeleteFilesCallback;


        // upload new files modal button
        STORAGE_CONSTANTS.uploadModalButtonEl.addEventListener(
            "click", this.openUploadModal, false);

        // close upload files modal by clicking cancel
        STORAGE_CONSTANTS.uploadCloseButtonEl.addEventListener(
            "click", this.closeUploadModal, false);

	    // click upload to upload new file(s)
	    STORAGE_CONSTANTS.uploadButtonEl.addEventListener(
            "click", this.uploadNewFilesToDirectoryHandler, false);
            

        // create new directory modal button
        STORAGE_CONSTANTS.directoryModalButtonEl.addEventListener(
            "click", this.openDirectoryModal, false);

        // close new directory modal by clicking cancel
        STORAGE_CONSTANTS.directoryCloseButtonEl.addEventListener(
            "click", this.closeDirectoryModal, false);

        // click ok to create a new directory
        STORAGE_CONSTANTS.directoryOkButtonEl.addEventListener(
            "click", this.createNewDirectoryHandler, false);


        // rename modal button
        STORAGE_CONSTANTS.renameModalButtonEl.addEventListener(
            "click", this.openRenameModal, false);

        // close rename modal by clicking cancel
        STORAGE_CONSTANTS.renameCloseButtonEl.addEventListener(
            "click", this.closeRenameModal, false);

        // click ok to rename file(s)
        STORAGE_CONSTANTS.renameOkButtonEl.addEventListener(
            "click", this.renameFilesHandler, false);


        // delete modal button
        STORAGE_CONSTANTS.deleteModalButtonEl.addEventListener(
            "click", this.openDeleteModal, false);

        // close delete modal by clicking cancel
        STORAGE_CONSTANTS.deleteCloseButtonEl.addEventListener(
            "click", this.closeDeleteModal, false);

        // click ok to delete file(s)
        STORAGE_CONSTANTS.deleteOkButtonEl.addEventListener(
            "click", this.deleteFilesHandler, false);

        
        // click off of modals to close
        window.addEventListener(
            "click", function(event) {
                if (event.target == STORAGE_CONSTANTS.uploadModalEl)
                    STORAGE_EVENT_HANDLERS.closeUploadModal();
                else if (event.target == STORAGE_CONSTANTS.directoryModalEl)
                    STORAGE_EVENT_HANDLERS.closeDirectoryModal();
                else if (event.target == STORAGE_CONSTANTS.renameModalEl)
                    STORAGE_EVENT_HANDLERS.closeRenameModal();
                else if (event.target == STORAGE_CONSTANTS.renameModalEl)
                    STORAGE_EVENT_HANDLERS.closeDeleteModal();
            }, false);
    };


    
    // opens the upload new file modal
    this.openUploadModal = function() {
        STORAGE_CONSTANTS.uploadModalEl.style.display = "block";
    };

    // opens the new directory modal
    this.openDirectoryModal = function() {
        STORAGE_CONSTANTS.directoryModalEl.style.display = "block";
    };

    // opens the rename modal
    this.openRenameModal = function() {
        STORAGE_CONSTANTS.renameModalEl.style.display = "block";
    };

    // opens the delete modal
    this.openDeleteModal = function() {
        STORAGE_CONSTANTS.deleteModalEl.style.display = "block";
    };


    // closes the upload new file modal
    this.closeUploadModal = function() {
        STORAGE_CONSTANTS.uploadModalEl.style.display = "none";
    };

    // closes the new directory modal
    this.closeDirectoryModal = function() {
        STORAGE_CONSTANTS.directoryModalEl.style.display = "none";
    };

    // closes the rename modal
    this.closeRenameModal = function() {
        STORAGE_CONSTANTS.renameModalEl.style.display = "none";
    };

    // closes the delete modal
    this.closeDeleteModal = function() {
        STORAGE_CONSTANTS.deleteModalEl.style.display = "none";
    };


    // adds click callbacks to see selected files
    this.activateClickToSelectItemCallback = function(itemId) {
        document.getElementById(itemId).addEventListener(
            "click", function(event) {
                this.classList.toggle(
                    STORAGE_CONSTANTS.selectedClass);
            }, false);
    };
    
    
    // handles uploading of the file to the storage room or a subdirectory
    // using the callback provided
	this.uploadNewFilesToDirectoryHandler = function() {
        var storagePageName = STORAGE_EVENT_HANDLERS.getStoragePageName();
        var filesToUpload = STORAGE_CONSTANTS.uploadFieldEl.files;
        var parentDirectoryId = 
            STORAGE_EVENT_HANDLERS.getParentDirectoriesForAction();

        if (filesToUpload.length > 0 && parentDirectoryId.length == 1) {
            STORAGE_EVENT_HANDLERS.uploadNewFilesToDirectoryCallback(
                storagePageName, filesToUpload, parentDirectoryId[0]);

            STORAGE_CONSTANTS.uploadFieldEl.value = '';
        }
    };


    // creates a new directory
    this.createNewDirectoryHandler = function() {
        var storagePageName = STORAGE_EVENT_HANDLERS.getStoragePageName();
        var newDirectoryName = STORAGE_EVENT_HANDLERS.unicodeToChar(
            STORAGE_EVENT_HANDLERS.formatString(
                STORAGE_CONSTANTS.directoryTextEl.value));
        var parentDirectoryId = 
            STORAGE_EVENT_HANDLERS.getParentDirectoriesForAction();

        console.log(parentDirectoryId);
        console.log(parentDirectoryId[0]);

        if (newDirectoryName.length > 0 && parentDirectoryId.length == 1) {
            STORAGE_EVENT_HANDLERS.createNewDirectoryCallback(
                storagePageName, newDirectoryName, parentDirectoryId[0]);
        }
        else {
            console.log("No");
        }

        STORAGE_EVENT_HANDLERS.closeDirectoryModal();
    };


    // renames a selected file or list of files
    this.renameFilesHandler = function() {
        var storagePageName = STORAGE_EVENT_HANDLERS.getStoragePageName();
        var renameName = STORAGE_EVENT_HANDLERS.unicodeToChar(
            STORAGE_EVENT_HANDLERS.formatString(
                STORAGE_CONSTANTS.renameTextEl.value));
        var fileIdsToRename = STORAGE_EVENT_HANDLERS.getIdsOfClickedElements();

        if (renameName.length > 0 && fileIdsToRename.length > 0) {
            STORAGE_EVENT_HANDLERS.renameFilesCallback(
                storagePageName, fileIdsToRename, renameName);
        }
        else {
            console.log("No files selected or length of new name is less than 0!");
            // error
            // say that files renamed must be > length 0
            // and that 1 or more files must be selected
        }

        STORAGE_EVENT_HANDLERS.closeRenameModal();
    };

    
    // renames a selected file or list of files
    this.deleteFilesHandler = function() {
        var storagePageName = STORAGE_EVENT_HANDLERS.getStoragePageName();
        var fileIdsToDelete = STORAGE_EVENT_HANDLERS.getIdsOfClickedElements();
        fileIdsToDelete = FILE_MANAGER.removeRedundantFilesToDelete(
            fileIdsToDelete);

        if (fileIdsToDelete.length > 0) {
            STORAGE_EVENT_HANDLERS.deleteFilesCallback(
                storagePageName, fileIdsToDelete);
        }
        else {
            console.log("No files selected!");
            // error
            // say that files renamed must be > length 0
            // and that 1 or more files must be selected
        }

        STORAGE_EVENT_HANDLERS.closeDeleteModal();
    };




    // returns the parent directories an action corresponds too, based on 
    // current selected ids of clicked elements
    this.getParentDirectoriesForAction = function() {
        var idClickedList = STORAGE_EVENT_HANDLERS.getIdsOfClickedElements();

        if (idClickedList.length == 0) {
            return [STORAGE_EVENT_HANDLERS.getStoragePageId()];
        }

        for (var i = 0; i < idClickedList.length; i ++) {
            var clickedFile = FILE_MANAGER.idToFileMap.get(idClickedList[i]);

            if (clickedFile.getUploadPath) {
                idClickedList[i] = clickedFile.getParentDirectoryId;
            }
        }
        
        return idClickedList;
    };


    // gets the id(s) of clicked elements
    this.getIdsOfClickedElements = function() {
        var htmlList = document.getElementsByClassName(
            STORAGE_CONSTANTS.fileClass + " " + STORAGE_CONSTANTS.selectedClass);

        var idList = [];

        for (var i = 0; i < htmlList.length; i ++) {
            idList.push(htmlList[i].id);
        }

        return idList;
    };


    // returns the storage page id, formatted to remove all single and 
    // double quotes ['"]
    this.getStoragePageId = function() {
        if (this.storagePageId == null) {
            this.storagePageId = STORAGE_EVENT_HANDLERS.getJsonFromDataString(
                storagePage.textContent).pk;
        }
        
        return this.storagePageId;
    };


    // returns the name of the storage, with unicode converted to characters
    // and formatted to remove all single and double quotes ['"]
    this.getStoragePageName = function() {
        if (this.storagePageName == null) {
            this.storagePageName = 
                STORAGE_EVENT_HANDLERS.getStoragePageFields().filename;
        }
        
        return this.storagePageName;
    };


    // returns all of the fields of the storage, with unicode converted to
    // characters and formatted to remove all single and double quotes ['"]
    this.getStoragePageFields = function() {
        if (this.storagePageFields == null) {
            this.storagePageFields = STORAGE_EVENT_HANDLERS.getJsonFromDataString(
                storagePage.textContent).fields;
        }
        
        return this.storagePageFields;
    };

    
    // formats a string to remove all single and double quotes ['"]
    this.formatString = function(text) {
        return text.replace(/['"]+/g, '');
    };


    // converts unicode to characters
    this.unicodeToChar = function(text) {
        return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
    };


    // parses string into json data
    this.getJsonFromDataString = function(dataString) {
        return JSON.parse(STORAGE_EVENT_HANDLERS.unicodeToChar(
            dataString.replace('\'upload_path\': None', 
                    '\'upload_path\': null').replace(/[']+/g, '"')
                ));
    };
};