import * as alt from 'alt-server';

import './src/interactions.js';
import './src/events.js';
import './src/api.js';

import { TuningConfig } from '../shared/config.js';
import { useRebar } from '@Server/index.js';
import { Vehicle } from '@Shared/types/vehicle.js';

const Rebar = useRebar();
const { get, create, getAll, getMany, update, deleteDocument, createCollection } = Rebar.database.useDatabase();

if (TuningConfig.debug) {
    const allVehicles = await getAll('Vehicles');

    allVehicles.forEach(async (veh, index) => {
        const partialVehicle: Partial<Vehicle> = { _id: veh._id };
        const dbVehicle = await get<Vehicle>(partialVehicle, 'Vehicles');
        const altVehicle = new alt.Vehicle(
            dbVehicle.model,
            dbVehicle.pos.x,
            dbVehicle.pos.y,
            dbVehicle.pos.z,
            dbVehicle.rot.x,
            dbVehicle.rot.y,
            dbVehicle.rot.z,
        );
        Rebar.document.vehicle.useVehicleBinder(altVehicle).bind(dbVehicle);
    });

    alt.logWarning(`Spawned ${allVehicles.length} Vehicles.`);
}
