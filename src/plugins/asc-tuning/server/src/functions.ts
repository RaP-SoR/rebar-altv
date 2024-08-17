import * as alt from 'alt-server';
import { TuningConfig } from '../../shared/config.js';
import { useRebar } from '@Server/index.js';
import { TuningParts } from '../../shared/tuningParts.js';
import { TuningEvents } from '../../shared/events.js';

const Rebar = useRebar();
const NotificationAPI = await Rebar.useApi().getAsync('ascended-notification-api');

const SPECIAL_MOD_TYPES = {
    WHEELS: 23,
    WHEEL_COLOR: 64,
    PEARL_COLOR: 65,
    PRIMARY_COLOR: 66,
    SECONDARY_COLOR: 67,
    NEON: 68,
};

const COLORS = [9, 12, 120];
const NEON_SETTINGS: Record<number, { back: boolean; front: boolean; left: boolean; right: boolean }> = {
    0: { back: false, front: false, left: false, right: false },
    1: { back: true, front: true, left: true, right: true },
    2: { back: true, front: true, left: false, right: false },
    3: { back: false, front: false, left: true, right: true },
};

function setColor(type: number, mod: number, vehicle: alt.Vehicle) {
    if (mod >= 0 && mod < COLORS.length) {
        if (type === SPECIAL_MOD_TYPES.PRIMARY_COLOR) {
            vehicle.primaryColor = COLORS[mod];
        } else if (type === SPECIAL_MOD_TYPES.SECONDARY_COLOR) {
            vehicle.secondaryColor = COLORS[mod];
        }
    }
}

function setNeon(mod: number, vehicle: alt.Vehicle) {
    if (mod !== undefined && vehicle) {
        const { back, front, left, right } = NEON_SETTINGS[mod];
        vehicle.neon = { back, front, left, right };
    }
}

interface Notification {
    icon: string;
    title: string;
    subTitle: string;
    message: string;
    duration?: number;
    oggFile?: string;
}

function tuningNotification(player: alt.Player, notification: Notification) {
    if (TuningConfig.notifications) {
        NotificationAPI.create(player, notification);
    }
}

export async function installTuningMod(player: alt.Player, vehicle: alt.Vehicle, type: number, mod: number) {
    if (!player?.vehicle?.valid) {
        return null;
    }

    if (vehicle.modKit !== 1) {
        vehicle.modKit = 1;
    }

    alt.logWarning(`Current Type: ${type} | Current Mod: ${mod}`);

    switch (type) {
        case SPECIAL_MOD_TYPES.WHEELS:
            vehicle.setWheels(type, mod);
            break;
        case SPECIAL_MOD_TYPES.WHEEL_COLOR:
            vehicle.wheelColor = mod;
            break;
        case SPECIAL_MOD_TYPES.PEARL_COLOR:
            vehicle.pearlColor = mod;
            break;
        case SPECIAL_MOD_TYPES.PRIMARY_COLOR:
        case SPECIAL_MOD_TYPES.SECONDARY_COLOR:
            setColor(type, mod, player.vehicle);
            break;
        case SPECIAL_MOD_TYPES.NEON:
            setNeon(mod, player.vehicle);
            break;
        default:
            vehicle.setMod(type, mod);
            break;
    }

    tuningNotification(player, {
        icon: '🔧',
        title: 'Ascended Tuning',
        subTitle: 'Mod Installed',
        message: `Installed Mod => ${TuningParts.find((x) => x.index === type).part} (${mod})`,
        duration: 2000,
    });
}

export function setVehicleTuningColor(player: alt.Player, primary: number, secondary: number, vehicle: alt.Vehicle) {
    vehicle.primaryColor = primary;
    vehicle.secondaryColor = secondary;
}

interface AvailableMod {
    index: number;
    maxMods: number;
}

export async function getAvailableTuningMods(player: alt.Player): Promise<AvailableMod[]> {
    const availableMods: AvailableMod[] = [];

    player.vehicle.modKit = 1;

    for (let i = 0; i < 69; i++) {
        let maxMods = player.vehicle.getModsCount(i);

        if (i === SPECIAL_MOD_TYPES.WHEELS) {
            const availableWheels = await player.emitRpc(TuningEvents.ToClient.GET_WHEELS);
            maxMods = availableWheels;
        }

        if (i === SPECIAL_MOD_TYPES.WHEEL_COLOR || i === SPECIAL_MOD_TYPES.PEARL_COLOR) {
            maxMods = 159;
        }

        if (i === SPECIAL_MOD_TYPES.PRIMARY_COLOR || i === SPECIAL_MOD_TYPES.SECONDARY_COLOR) {
            maxMods = 3;
        }

        if (i === SPECIAL_MOD_TYPES.NEON) {
            maxMods = 4;
        }

        availableMods.push({ index: i, maxMods });
    }

    return availableMods;
}

export function getInstalledTuningMods(player: alt.Player) {
    const vehicle = Rebar.document.vehicle.useVehicle(player.vehicle);
    return vehicle.get().mods;
}

export async function resetVehicleTuning(player: alt.Player) {
    const dbVehicle = Rebar.document.vehicle.useVehicle(player.vehicle).get();

    if (!dbVehicle) {
        console.error('No database vehicle found for the given vehicle');
        return;
    }

    const vehicle = player.vehicle;

    if (dbVehicle.primaryColor) {
        vehicle.primaryColor = dbVehicle.primaryColor;
    }

    if (dbVehicle.secondaryColor) {
        vehicle.secondaryColor = dbVehicle.secondaryColor;
    }

    if (dbVehicle.neonPlacement) {
        vehicle.neon = dbVehicle.neonPlacement;
    }

    if (dbVehicle.neonColor) {
        vehicle.neonColor = dbVehicle.neonColor;
    }

    if (dbVehicle.customPrimaryColor) {
        vehicle.customPrimaryColor = dbVehicle.customPrimaryColor;
    }

    if (dbVehicle.customSecondaryColor) {
        vehicle.customSecondaryColor = dbVehicle.customSecondaryColor;
    }

    if (dbVehicle.mods && typeof dbVehicle.mods === 'object') {
        for (const [modKey, modValue] of Object.entries(dbVehicle.mods)) {
            console.log(`Resetting mod ${modKey} to value ${modValue}`);

            if (parseInt(modKey) === SPECIAL_MOD_TYPES.WHEELS) {
                vehicle.setWheels(SPECIAL_MOD_TYPES.WHEELS, modValue);
            } else if (
                ![
                    SPECIAL_MOD_TYPES.WHEEL_COLOR,
                    SPECIAL_MOD_TYPES.PEARL_COLOR,
                    SPECIAL_MOD_TYPES.PRIMARY_COLOR,
                    SPECIAL_MOD_TYPES.SECONDARY_COLOR,
                    SPECIAL_MOD_TYPES.NEON,
                ].includes(parseInt(modKey))
            ) {
                vehicle.setMod(parseInt(modKey), modValue);
            }
        }
    } else {
        console.log('No mods to reset or mods is not an object');
    }
}
