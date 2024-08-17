import * as alt from 'alt-server';
import { HotKeyEvents } from '../shared/hotKeyEvents.js';

alt.onClient(HotKeyEvents.toServer.pressed, (player: alt.Player, key: alt.KeyCode) => {
    alt.log(`${player.name} pressed key ${key}`);
});