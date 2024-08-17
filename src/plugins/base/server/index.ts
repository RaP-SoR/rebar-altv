import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
alt.log('[Plugin:Base] loaded successfully.');

const Rebar = useRebar();
const api = Rebar.useApi();
const RebarEvents = Rebar.events.useEvents();
const SpawnPos = { x: -867.1437377929688, y: -172.6201934814453, z: 36.799232482910156 };



RebarEvents.on('character-bound', (player) => {
    //Rebar.player.useWebview(player).show('chat', 'page');
});


// Ideally you only want to show the chat, after the player has fully logged in
alt.on('playerConnect', async (player) => {
   // player.model = 'mp_m_freemode_01';
    //player.spawn(SpawnPos);
    const chat = await api.getAsync('chat-api');
    chat.show(player);

    // Check if they're chatting server-side
    const isChatting = chat.isChatting(player);

    // Call back to check when a players chat status changes
    chat.onChatStatusChange((player, isCurrentlyChatting) => {});
});