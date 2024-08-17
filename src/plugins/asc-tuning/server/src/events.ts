import * as alt from 'alt-server';

import { TuningEvents } from '../../shared/events.js';
import { useWebview } from '@Server/player/webview.js';
import { getAvailableTuningMods, installTuningMod, resetVehicleTuning } from './functions.js';
import { useRebar } from '@Server/index.js';

const Rebar = useRebar();

alt.onRpc(TuningEvents.RPC.REQUEST_MODS, async (player: alt.Player) => {
    const result = getAvailableTuningMods(player);

    return result;
});

alt.onClient(TuningEvents.ToServer.BUY_TUNING, (player: alt.Player, cartItems) => {
    alt.logWarning(`Current Cart: ${JSON.stringify(cartItems, undefined, 4)}`);
    const boughtMods = [];

    if (cartItems && typeof cartItems === 'object') {
        const cartArray = Object.values(cartItems) as [{ mod: number; type: number }];

        for (const item of cartArray) {
            console.log(`ModType: ${item.type} | Mod Index: ${item.mod}`);
            boughtMods.push(item);
        }

        const vehicle = player.vehicle;
        if (!vehicle) {
            console.error('Player is not in a vehicle');
            return;
        }

        const dbVehicle = Rebar.document.vehicle.useVehicle(vehicle).get();
        if (!dbVehicle) {
            console.error('No database vehicle found for the given vehicle');
            return;
        }

        dbVehicle.primaryColor = vehicle.primaryColor;
        dbVehicle.secondaryColor = vehicle.secondaryColor;

        dbVehicle.wheelColor = vehicle.wheelColor;
        dbVehicle.pearlColor = vehicle.pearlColor;

        dbVehicle.customPrimaryColor = vehicle.customPrimaryColor;
        dbVehicle.customSecondaryColor = vehicle.customSecondaryColor;
        dbVehicle.neonColor = vehicle.neonColor;
        dbVehicle.neonPlacement = vehicle.neon;

        if (dbVehicle.mods && typeof dbVehicle.mods === 'object') {
            // dbVehicle.wheelColor = vehicle.wheelColor;
            // dbVehicle.pearlColor = vehicle.pearlColor;
            for (const item of boughtMods) {
                dbVehicle.mods[item.type] = item.mod;
                console.log(`Updated mod ${item.type} to value ${item.mod}`);
            }
        }

        Rebar.document.vehicle.useVehicle(vehicle).setBulk({
            mods: dbVehicle.mods,
            primaryColor: dbVehicle.primaryColor,
            secondaryColor: dbVehicle.secondaryColor,
            wheelColor: dbVehicle.wheelColor,
            pearlColor: dbVehicle.pearlColor,
            customPrimaryColor: dbVehicle.customPrimaryColor,
            customSecondaryColor: dbVehicle.customSecondaryColor,
            neonPlacement: dbVehicle.neonPlacement,
            neonColor: dbVehicle.neonColor,
        });
        alt.logWarning(`Updated dbVehicle: ${JSON.stringify(dbVehicle.mods, undefined, 4)}`);
    } else {
        console.error('cartItems is not an object or is null');
    }
});

alt.onClient(TuningEvents.ToServer.CHANGE_PRIMARY_COLOR, (player: alt.Player, color) => {
    if (!player.vehicle) return;

    alt.logWarning(`Color: ${color}`);

    player.vehicle.customPrimaryColor = hexToRgba(color);
});

alt.onClient(TuningEvents.ToServer.CHANGE_SECONDARY_COLOR, (player: alt.Player, color) => {
    if (!player.vehicle) return;

    alt.logWarning(`Color: ${color}`);

    player.vehicle.customSecondaryColor = hexToRgba(color);
});

alt.onClient(TuningEvents.ToServer.CHANGE_NEON_COLOR, (player: alt.Player, color) => {
    if (!player.vehicle) return;

    alt.logWarning(`Color: ${color}`);

    player.vehicle.neonColor = hexToRgba(color);
});

alt.onClient(TuningEvents.ToServer.INSTALL_MOD, (player: alt.Player, index: number, activeIndex: number) => {
    alt.logWarning(`Current Index: ${index} | Current Active Index: ${activeIndex}`);

    installTuningMod(player, player.vehicle, index, activeIndex);
});

alt.onClient(TuningEvents.ToServer.CLOSE, async (player: alt.Player) => {
    const WebView = useWebview(player);

    WebView.hide('Tuning');
    alt.emitClient(player, TuningEvents.ToClient.DISABLE_CONTROLS, true);
    if (player.seat === 1) {
        resetVehicleTuning(player);
    }
});

function hexToRgba(hex: string) {
    // Remove the leading `#` if present
    hex = hex.replace(/^#/, '');

    // Parse the hex string to get the RGB values
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    // Return the RGBA object (assuming full opacity)
    return new alt.RGBA(r, g, b, 255);
}
