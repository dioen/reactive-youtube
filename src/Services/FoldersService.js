import GoogleFileService from './GoogleFileService'

export class FoldersService {
    constructor() {
        this._GoogleFileService = new GoogleFileService();
    }

    getFolder(googleFileId, folderPath = "root/") {
        return this._GoogleFileService.loadFileFromDrive(googleFileId)
            .then(response => {
                return Object.values(response.settings.lists).filter(folder => folder.absolute_path == folderPath);
            })
    }

    getAllFoldersList(googleFileId) {
        return this.getGoogleFileContent(googleFileId)
        .then(response => {
            return {
                lists: Object.values(response.settings.lists).map(list => list.absolute_path),
                googleFileContent: response
            };
        });
    }

    getGoogleFileContent(fileId) {
        return this._GoogleFileService.loadFileFromDrive(fileId);
    }

    createFolder(fileContent, rootAbsolutePath = "root/", folderName = "", fileId = "") {
        fileContent.lists[rootAbsolutePath + folderName + "/"] = {
            "folders": [],
            "items": []
        };
        fileContent.lists[rootAbsolutePath + folderName + "/"].absolute_path = rootAbsolutePath + folderName + "/";
        fileContent.lists[rootAbsolutePath + folderName + "/"].parent_path = rootAbsolutePath;
        
        fileContent.lists[rootAbsolutePath].folders.push(folderName);

        return this._GoogleFileService.updateFileOnDriveTest(fileId, fileContent);
    }

    removeFolder(fileContent, rootAbsolutePath, folderName, fileId) {
        fileContent.lists[rootAbsolutePath].folders = fileContent.lists[rootAbsolutePath].folders.filter(folder => folder != folderName);
        delete fileContent.lists[rootAbsolutePath + folderName + "/"];

        return this._GoogleFileService.updateFileOnDriveTest(fileId, fileContent);
    }

    addItemToFolder(fileContent, element, folderAbsolutePath, googleFileId) {
        Object.values(fileContent.lists).filter(folder => folder.absolute_path == folderAbsolutePath)[0].items.push(element);

        return this._GoogleFileService.updateFileOnDriveTest(googleFileId, fileContent);
    }

    removeItemFromFolder(fileContent, itemId, folderAbsolutePath, googleFileId) {
        fileContent.lists[folderAbsolutePath].items = fileContent.lists[folderAbsolutePath].items.filter(item => item.id != itemId);

        return this._GoogleFileService.updateFileOnDriveTest(googleFileId, fileContent);
    }
}