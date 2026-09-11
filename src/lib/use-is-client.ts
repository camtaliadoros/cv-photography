import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True once the component is running in the browser.
 *
 * Lets a component read `localStorage` during render rather than in an effect —
 * the server and the first client render both see `false`, so hydration still
 * matches, and there's no setState-in-effect cascade.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/** Reads a key from localStorage, tolerating blocked storage. */
export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Writes a key to localStorage, tolerating blocked storage. */
export function writeStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* Private browsing or blocked site data — the choice just isn't remembered. */
  }
}
