import * as alt from 'alt-server';
import * as utility from '@Shared/utility/index.js';
import { useRebar } from '@Server/index.js';
import { tuningLocations } from './locations.js';
import { useWebview } from '@Server/player/webview.js';
import { TuningEvents } from '../../shared/events.js';
import { useApi } from '@Server/api/index.js';
import { MarkerType } from '@Shared/types/marker.js';
import { TuningConfig } from '../../shared/config.js';

const Rebar = useRebar();
const TargetAPI = await useApi().getAsync('ascended-target-api');

alt.on('playerConnect', (player: alt.Player) => {
    createTuningInteractions(player);
});

function createTuningInteractions(player: alt.Player) {
    for (const loc of tuningLocations) {
        if (TuningConfig.asc_target) {
            const blip = Rebar.controllers.useBlipGlobal({
                pos: loc,
                color: 5,
                text: 'Tuner',
                shortRange: true,
                scale: 1,
                sprite: 75,
            });
            createInteraction(player, loc);
        } else {
            const interaction = Rebar.controllers.useInteraction(
                new alt.ColshapeCylinder(loc.x, loc.y, loc.z - 1, 5, 10),
                'vehicle',
            );
            interaction.setMessage('enter', 'Press E to Tune Vehicle');

            const blip = Rebar.controllers.useBlipGlobal({
                pos: loc,
                color: 5,
                text: 'Tuner',
                shortRange: true,
                scale: 1,
                sprite: 75,
            });

            const marker = Rebar.controllers.useMarkerGlobal({
                color: new alt.RGBA(255, 0, 0, 100),
                type: MarkerType.CAR,
                pos: loc,
                scale: { x: 1, y: 1, z: 1 },
            });
            interaction.on(handleInteraction);
        }
    }
}

function createInteraction(player: alt.Player, loc: alt.Vector3) {
    const posInteraction = {
        pos: loc,
        interactions: [
            {
                uid: utility.uid.generate(),
                text: 'Tune Vehicle',
                handle: () => {
                    handleInteraction(player);
                },
            },
            {
                uid: utility.uid.generate(),
                text: 'Remove Tuning',
                handle: () => {
                    console.log(`Remove Tuning called`);
                },
            },
        ],
    };

    TargetAPI.createPosInteraction(posInteraction.pos, posInteraction.interactions);
}

function handleInteraction(player: alt.Player) {
    if (player.seat === 1) {
        const WebView = useWebview(player);

        WebView.show('Tuning', 'page');

        alt.emitClient(player, TuningEvents.ToClient.DISABLE_CONTROLS, false);
    }
}
