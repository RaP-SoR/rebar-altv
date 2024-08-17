import { useApi } from '@Server/api/index.js';

const FuelAPI = await useApi().getAsync('ascended-fuel-api');

export const NO_TARGET_FUELSTATIONS = [
    {
        name: 'Ascended Fuelstation',
        pos: {
            x: -2095.738525390625,
            y: -320.547607421875,
            z: 12.0244722366333,
        },
        availableFuel: [
            {
                Gasolin: { name: 'Gasolin', price: 5 },
                Diesel: { name: 'Diesel', price: 2 },
            },
        ],
    },
    {
        name: 'Ascended Fuelstation 2',
        pos: {
            x: 0,
            y: 1,
            z: 72,
        },
        availableFuel: [
            {
                Gasolin: { name: 'Gasolin', price: 5 },
            },
        ],
    },
];
