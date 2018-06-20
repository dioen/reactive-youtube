export default class GoogleFileService {
    constructor() { }

    createFileWithJSONContent(data) {
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        const contentType = 'application/json';

        let metadata = {
            'name': 'ytsettings.json',
            'mimeType': contentType
        };

        let multipartRequestBody =
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + contentType + '\r\n\r\n' +
            data +
            close_delim;

        return multipartRequestBody;
    }

    saveFileOnDrive(data) {
        return new Promise((resolve, reject) => {
            let multipartRequestBody = this.createFileWithJSONContent(data);
            const boundary = '-------314159265358979323846';

            var request = gapi.client.request({
                'path': '/upload/drive/v3/files',
                'method': 'POST',
                'params': {
                    'uploadType': 'multipart'
                },
                'headers': {
                    'Content-Type': 'multipart/related; boundary="' + boundary + '"'
                },
                'body': multipartRequestBody
            });

            request.execute((response) => {
                resolve(response);
            });
        });

    }

    loadFileFromDrive(fileId) {
        return new Promise((resolve, reject) => {
            gapi.client.load('drive', 'v2',
                () => {
                    let request = gapi.client.drive.files.get({
                        fileId: fileId,
                        mimeType: 'text/json',
                        alt: 'media'
                    });

                    request.execute((response) => {
                        resolve(response);
                    });
                });
        });
    }

    ifFileExist() {
        return new Promise((resolve, reject) => {
            gapi.client.load('drive', 'v2',
                () => {
                    let request = gapi.client.drive.files.list({
                        q: "title='ytsettings.json'"
                    });
                    request.execute((response) => {
                        (response.items.length > 0) ?
                            resolve({
                                response: true,
                                id: response.items[0].id
                            })
                            :
                            resolve(false);
                    });
                });
        });

    }

    updateFileOnDriveTest(fileId, data) {
        return new Promise((resolve, reject) => {
            this.loadFileFromDrive(fileId)
                .then((response) => {
                    let newContent = { settings: data };
                    let multipartRequestBody = this.createFileWithJSONContent(JSON.stringify(newContent));
                    const boundary = '-------314159265358979323846';

                    let request = gapi.client.request({
                        'path': '/upload/drive/v2/files/' + fileId,
                        'method': 'PUT',
                        'params': {
                            'uploadType': 'multipart',
                            'alt': 'json'
                        },
                        'headers': {
                            'Content-Type': 'multipart/related; boundary="' + boundary + '"'
                        },
                        'body': multipartRequestBody
                    });

                    request.execute(() => {
                        resolve();
                    });
                });
        });
    }

    updateFileOnDrive(fileId, item) {
        return new Promise((resolve, reject) => {
            this.loadFileFromDrive(fileId)
                .then((response) => {
                    let newContent = { settings: { items: [] } };
                    newContent.settings.items = response.settings.items;
                    newContent.settings.items.push(item);
                    let multipartRequestBody = this.createFileWithJSONContent(JSON.stringify(newContent));
                    const boundary = '-------314159265358979323846';

                    let request = gapi.client.request({
                        'path': '/upload/drive/v2/files/' + fileId,
                        'method': 'PUT',
                        'params': {
                            'uploadType': 'multipart',
                            'alt': 'json'
                        },
                        'headers': {
                            'Content-Type': 'multipart/related; boundary="' + boundary + '"'
                        },
                        'body': multipartRequestBody
                    });

                    request.execute(() => {
                        resolve();
                    });
                });
        });
    }
}
