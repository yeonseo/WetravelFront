class SessionStorageService {
    STORAGE_KEY_PREFIX = 'wt_';

    setItem(key, value) {
        sessionStorage.setItem(
            this.STORAGE_KEY_PREFIX + key,
            JSON.stringify(value)
        );
    }

    getItem(key, includePrefix = true) {
        if (includePrefix) {
            key = this.STORAGE_KEY_PREFIX + key;
        }

        return JSON.parse(sessionStorage.getItem(key));
    }

    removeItem(key) {
        sessionStorage.removeItem(this.STORAGE_KEY_PREFIX + key);
    }

    clearStorage() {
        sessionStorage.clear();
    }
}

export default new SessionStorageService();
