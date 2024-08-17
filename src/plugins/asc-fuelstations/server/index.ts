import * as alt from 'alt-server';
import * as utility from '@Shared/utility/index.js';

import { useApi } from '@Server/api/index.js';
import { handleStationInteraction, handleStationInteractionNoTarget } from './src/interactions.js';
import { FuelstationConfig } from '../shared/config.js';
import { NO_TARGET_FUELSTATIONS } from '../shared/fuelstations.js';
import { useRebar } from '@Server/index.js';

import './src/interactions.js';
import './src/events.js';
import { MarkerType } from '@Shared/types/marker.js';

const Rebar = useRebar();

if (FuelstationConfig.ASC_TARGET) {
    const TargetAPI = await useApi().getAsync('ascended-target-api');
    alt.on('playerConnect', (player: alt.Player) => {
        for (const entry of TargetAPI.getAvailableObjects().gasStations) {
            TargetAPI.createModelInteraction(player, {
                uid: utility.uid.generate(),
                model: alt.hash(entry),
                interactions: [
                    {
                        text: 'Open Fuelstation', // Name of first context-button
                        uid: utility.uid.generate(), // UID Generator OR Custom UID
                        handle: handleStationInteraction, // Function attached to the button
                    },
                ],
            });
        }
    });
} else {
    for (const entry of NO_TARGET_FUELSTATIONS) {
        const interaction = Rebar.controllers.useInteraction(
            new alt.ColshapeCylinder(entry.pos.x, entry.pos.y, entry.pos.z, 5, 2),
            'player',
        );
        interaction.setMessage('enter', 'Press E to Open Fuelstation');

        Rebar.controllers.useBlipGlobal({
            pos: entry.pos,
            color: 5,
            text: entry.name,
            shortRange: true,
            scale: 1,
            sprite: 75,
        });

        Rebar.controllers.useMarkerGlobal({
            color: new alt.RGBA(255, 0, 0, 100),
            type: MarkerType.CAR,
            pos: {
                x: entry.pos.x,
                y: entry.pos.y,
                z: entry.pos.z + 0.2,
            },
            scale: { x: 1, y: 1, z: 1 },
        });

        interaction.on(handleStationInteractionNoTarget);
    }
}
