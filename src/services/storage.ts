export const storageService = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('LocalStorage oxuma xətası:', error);
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      const stringifiedValue = JSON.stringify(value);
      if (localStorage.getItem(key) === stringifiedValue) {
        return; // Deduplicate identical writes
      }
      localStorage.setItem(key, stringifiedValue);
    } catch (error) {
      console.error('LocalStorage yazma xətası:', error);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('LocalStorage silmə xətası:', error);
    }
  }
};
