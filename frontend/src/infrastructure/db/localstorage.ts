export class LocalStorage {
  save(key: string, data: unknown){
    try{
      const serializeData = JSON.stringify(data);
      localStorage.setItem(key, serializeData);
    } catch(e){
      console.error('Error saving to localStorage:', e);
    }
  }

  load(key: string): unknown | null {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData === null) {
        return null;
      }
      return JSON.parse(serializedData);
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  }

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
}