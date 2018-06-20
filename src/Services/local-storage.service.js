export class LocalStorageService {
    constructor() {}

    setUserData = (dataToStoreObject = null, storageName = 'userSettings') => {
        this.clearLocalStorage();

        const currentDate = new Date();
        let userSettings = {
            created_on: currentDate,
            user_data: dataToStoreObject
        }
        const stringifyData = JSON.stringify(userSettings);
        localStorage.setItem(storageName, stringifyData);
    }

    getUserData = (storageName = 'userSettings') => {
        return JSON.parse(localStorage.getItem(storageName));
    }

    clearLocalStorage = () => {
        return localStorage.clear();
    }
}
