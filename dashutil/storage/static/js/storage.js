// storage.js -- handles storage page functionality, API calls, page UI
'use strict';


$(document).ready(function() {

    // Set up event handlers
    STORAGE_EVENT_HANDLERS.addAllEventListeners(uploadNewFilesToDirectory, 
        createNewDirectory, renameFiles, deleteFiles, 
        getFilesWithinDirectory, moveFiles, getFilePathsAndUrls);

    FILE_MANAGER.initializeSelf();

    FILE_MANAGER.createStorageFileRecord(
        STORAGE_EVENT_HANDLERS.getStoragePageId(), 
        STORAGE_EVENT_HANDLERS.getStoragePageFields());

    FILE_MANAGER.addExistingFileListToPage(
        STORAGE_EVENT_HANDLERS.getJsonFromDataString(
            storageFiles.textContent));

    document.getElementById("storageFiles").remove();
    document.getElementById("storagePage").remove();
}); 


/*****************************************************************************
 * Storage Functions ----- START ------
 *****************************************************************************/

// Uploads a new file to a given directory within a storage
// This method is called back from STORAGE_EVENT_HANDLERS
function uploadNewFilesToDirectory(storageName, filesToUpload, 
    parentDirectoryId) {

    uploadFileToStorageDB(addNewFilesToPage, fileUploadFailedError,
        storageName, filesToUpload, parentDirectoryId);
}


// Gets child files for a given directory
// This method is called back from STORAGE_EVENT_HANDLERS
function getFilesWithinDirectory(storageName, directoryId) {

    getFilesWithinDirectoryDB(addExistingFilesToPage, 
        directoryExpandFailedError, storageName, directoryId);
}

// Gets a list of all file path/names and urls to download from a 
// list of fileIds, including subfiles and directories if applicable
// This method is called back from STORAGE_EVENT_HANDLERS
function getFilePathsAndUrls(storageName, fileIdsToDownload) {
    getFilePathsAndUrlsDB(downloadSelectedFiles, downloadFailedError, 
        storageName, fileIdsToDownload);
}

// Creates a new directory under a given directory within a storage
// This method is called back from STORAGE_EVENT_HANDLERS
function createNewDirectory(storageName, newDirectoryName, parentDirectoryId) {

    createNewDirectoryDB(addNewFilesToPage, directoryCreationFailedError,
        storageName, newDirectoryName, parentDirectoryId);
}


// Renames a file or list of files
// This method is called back from STORAGE_EVENT_HANDLERS
function renameFiles(storageName, fileIdsToRename, renameName) {

    renameFilesDB(renameExistingFiles, renameFailedError,
        storageName, fileIdsToRename, renameName);
}


// Deletes a file or list of files
// This method is called back from STORAGE_EVENT_HANDLERS
function deleteFiles(storageName, fileIdsToDelete) {

    deleteFilesDB(deleteExistingFiles, deleteFailedError,
        storageName, fileIdsToDelete);
}


// Moves a file or list of files
// This method is called back from STORAGE_EVENT_HANDLERS
function moveFiles(storageName, fileIdsToMove, destinationId) {

    moveFilesToDirectoryDB(moveExistingFiles, moveFailedError,
        storageName, fileIdsToMove, destinationId);
}  



// Adds files/directories to the storage page
function addNewFilesToPage(files) {
    FILE_MANAGER.addNewFileListToPage(files);
}


// Adds files/directories to the storage page
function addExistingFilesToPage(files) {
    FILE_MANAGER.addExistingFileListToPage(files);
}


function downloadSelectedFiles(files) { 
    FILE_MANAGER.downloadFileList(files);
}


// rename existing files on the page with new information
function renameExistingFiles(files) {
    FILE_MANAGER.renameExistingFilesOnPage(files);
}


// deletes existing files on the page
function deleteExistingFiles(files) {
    FILE_MANAGER.deleteExistingFilesOnPage(files);
}

// moves existing files on the page
function moveExistingFiles(files) {
    FILE_MANAGER.moveExistingFilesOnPage(files);
}


// Displays error after a file failed to upload
// This method is called back after a file failed to upload
function fileUploadFailedError(errorMessage, parentDirectoryId) {
    // TODO: handle this
}


// Displays error after a directory failed to expand
// This method is called back after a directory failed to expand
function directoryExpandFailedError(errorMessage, parentDirectoryId) {
    // TODO: handle this
}


// Displays error after information get for file download failed
// This method is called back after information get for file download failed
function downloadFailedError(errorMessage, parentDirectoryId) {
    // TODO: handle this
}


// Displays error after a directory failed to be created
// This method is called back after a directory failed to be created
function directoryCreationFailedError(errorMessage, parentDirectoryId) {
    // TODO: handle this
}


// Displays error after file(s) failed to be renamed
// This method is called back after file(s) failed to be renamed
function renameFailedError(errorMessage, parentDirectoryId) {
    // TODO: handle this
}

// Displays error after file(s) failed to be renamed
// This method is called back after file(s) failed to be renamed
function deleteFailedError(errorMessage, parentDirectoryId) {
    // TODO: handle this
}


// Displays error after file(s) failed to be renamed
// This method is called back after file(s) failed to be renamed
function moveFailedError(errorMessage, parentDirectoryId) {
    // TODO: handle this
}

/*****************************************************************************
 * Storage Functions ----- END ------
 *****************************************************************************/



/*****************************************************************************
 * Helper Functions ----- START ------
 *****************************************************************************/

/*****************************************************************************
 * Helper Functions ----- END ------
 *****************************************************************************/