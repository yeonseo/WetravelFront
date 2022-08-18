class LocalStorageService {
    STORAGE_KEY_PREFIX = 'app_localstorage_';

    setItem(key, value) {
        localStorage.setItem(
            this.STORAGE_KEY_PREFIX + key,
            JSON.stringify(value)
        );
    }

    getItem(key, includePrefix = true) {
        if (includePrefix) {
            key = this.STORAGE_KEY_PREFIX + key;
        }

        return JSON.parse(localStorage.getItem(key));
    }

    removeItem(key) {
        localStorage.removeItem(this.STORAGE_KEY_PREFIX + key);
    }

    clearStorage() {
        localStorage.clear();
    }
}

export default new LocalStorageService();
