import { writable } from 'svelte/store';

const createWritableStore = (key, value) => {
    const { subscribe, set } = writable(value);

    return {
        subscribe,
        set,
        useLocalStorage: () => {
            const json = localStorage.getItem(key);
            if (json) {
                set(JSON.parse(json));
            }

            subscribe(current => {
                localStorage.setItem(key, JSON.stringify(current));
            });
        }
    };
}

export const hostname = createWritableStore('hostname', "192.168...");
