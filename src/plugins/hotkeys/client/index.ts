import * as alt from 'alt-client';
import { useClientApi } from '@Client/api/index.js';
import { HotKeyEvents } from '../shared/hotKeyEvents.js';

type HotKeyCallback = (isLongPress: boolean) => void;

class HotKeyManager {
  private hotkeys: { [key: number]: HotKeyCallback } = {};
  private longPressTimeout: number = 500;
  private longPressTimers: { [key: string]: number } = {};

  constructor() {
    alt.on('keyup', this.handleKeyUp);
    alt.on('keydown', this.handleKeyDown);
    alt.onServer(HotKeyEvents.toClient.addHotkey, this.addHotKey);
    alt.onServer(HotKeyEvents.toClient.removeHotkey, this.removeHotKey);
  }

  addHotKey(key: alt.KeyCode | number, callback: HotKeyCallback) {
    this.hotkeys[key] = callback;
  }

  removeHotKey(key: alt.KeyCode | number) {
    delete this.hotkeys[key];
  }

  private handleKeyDown = (key: alt.KeyCode | number) => {
    if (this.hotkeys[key]) {
      this.longPressTimers[key] = alt.setTimeout(() => {
        if (alt.isKeyDown(key)) {
          this.hotkeys[key](true);
          this.clearLongPressTimer(key);
        }
      }, this.longPressTimeout);
    }
  };

  private handleKeyUp = (key: alt.KeyCode | number) => {
    if (this.hotkeys[key]) {
      const isLongPress = this.clearLongPressTimer(key);

      if (!isLongPress) {
        this.hotkeys[key](false);
      }
    }
  };

  private clearLongPressTimer(key: alt.KeyCode | number) {
    if (this.longPressTimers[key] && this.longPressTimers[key] !== null) {
      alt.clearTimeout(this.longPressTimers[key]);
      this.longPressTimers[key] = null;
      return true;
    }
    return false;
  }
}

const clientHotKeyManager = new HotKeyManager();

export function useHotkeys() {
  function addHotKey(key: alt.KeyCode | number, callback: HotKeyCallback) {
    clientHotKeyManager.addHotKey(key, callback);
  }

  function removeHotKey(key: alt.KeyCode | number) {
    clientHotKeyManager.removeHotKey(key);
  }

  return { addHotKey, removeHotKey };
}

useClientApi().register('hotkey-api', useHotkeys());

declare global {
  export interface ClientPlugin {
    ['hotkey-api']: ReturnType<typeof useHotkeys>;
  }
}
