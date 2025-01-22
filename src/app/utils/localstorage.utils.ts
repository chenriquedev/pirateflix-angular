import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export default class LocalStorage<T> {
  getItem(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item) {
      const decodeItem = decodeURIComponent(atob(item))
      return JSON.parse(decodeItem);
    }
    return null;
  }

  setItem(key: string, value: T): void {
    const stringValue = JSON.stringify(value);
    const bodyCoded = btoa(encodeURIComponent(stringValue));
    localStorage.setItem(key, bodyCoded);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
