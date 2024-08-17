import * as alt from 'alt-server';

import { useApi } from '@Server/api/index.js';
import { getAvailableTuningMods, getInstalledTuningMods, installTuningMod, setVehicleTuningColor } from './functions.js';

export function useTuningAPI() {
    function installMod(player: alt.Player, vehicle: alt.Vehicle, type: number, mod: number) {
        installTuningMod(player, vehicle, type, mod);
    }

    function getInstalledMods(player: alt.Player) {
        getInstalledTuningMods(player)
    }

    function getAvailableMods(player: alt.Player) {
        getAvailableTuningMods(player);
    }

    function setVehicleColor(player: alt.Player, primary: number, secondary: number, vehicle: alt.Vehicle) {
        setVehicleTuningColor(player, primary, secondary, vehicle);
    }
    
    return {
        installMod,
        getInstalledMods,
        getAvailableMods,
        setVehicleColor
    };
}

declare global {
    export interface ServerPlugin {
        ['asc-tuning-api']: ReturnType<typeof useTuningAPI>;
    }
}

useApi().register('asc-tuning-api', useTuningAPI());