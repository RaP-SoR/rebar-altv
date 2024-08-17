import * as alt from 'alt-server';
import { FuelStationEvents } from '../../shared/events.js';
import { NO_TARGET_FUELSTATIONS } from '../../shared/fuelstations.js';
import { useRebar } from '@Server/index.js';
import { useWebview } from '@Server/player/webview.js';
import { useApi } from '@Server/api/index.js';

const Rebar = useRebar();
const FuelAPI = await useApi().getAsync('ascended-fuel-api');

export async function handleStationInteraction(player: alt.Player) {
    const closeVehicle = Rebar.get.useVehicleGetter().closestVehicle(player, 3);
    if (!closeVehicle || player.vehicle) return;

    const WebView = useWebview(player);

    WebView.show('Fuelstations', 'page', true);
    WebView.focus();
    Rebar.player.useWorld(player).disableControls();

    const model = Rebar.vehicle.useVehicle(closeVehicle).getVehicleModelName();
    const vehicleFuelData = {
        fuelType: Rebar.document.vehicle.useVehicle(closeVehicle).get().ascendedFuel.type,
        maxFuel: Rebar.document.vehicle.useVehicle(closeVehicle).get().ascendedFuel.max,
        fuel: Rebar.document.vehicle.useVehicle(closeVehicle).getField('fuel'),
    };

    WebView.emit(FuelStationEvents.WebView.SET_DATA, vehicleFuelData, FuelAPI.getFuelTypes, model);
}

export async function handleStationInteractionNoTarget(player: alt.Player) {
    const closeVehicle = Rebar.get.useVehicleGetter().closestVehicle(player, 3);
    if (!closeVehicle || player.vehicle) return;

    const WebView = useWebview(player);

    WebView.show('Fuelstations', 'page', true);
    WebView.focus();
    Rebar.player.useWorld(player).disableControls();

    const model = Rebar.vehicle.useVehicle(closeVehicle).getVehicleModelName();
    const vehicleFuelData = {
        fuelType: Rebar.document.vehicle.useVehicle(closeVehicle).get().ascendedFuel.type,
        maxFuel: Rebar.document.vehicle.useVehicle(closeVehicle).get().ascendedFuel.max,
        fuel: Rebar.document.vehicle.useVehicle(closeVehicle).getField('fuel'),
    };

    const playerPos = player.pos;
    const closestStation = NO_TARGET_FUELSTATIONS.reduce((prev, curr) => {
        const prevDistance = Math.sqrt(
            Math.pow(prev.pos.x - playerPos.x, 2) +
                Math.pow(prev.pos.y - playerPos.y, 2) +
                Math.pow(prev.pos.z - playerPos.z, 2),
        );
        const currDistance = Math.sqrt(
            Math.pow(curr.pos.x - playerPos.x, 2) +
                Math.pow(curr.pos.y - playerPos.y, 2) +
                Math.pow(curr.pos.z - playerPos.z, 2),
        );
        return currDistance < prevDistance ? curr : prev;
    });

    WebView.emit(FuelStationEvents.WebView.SET_DATA, vehicleFuelData, closestStation.availableFuel, model);
}
