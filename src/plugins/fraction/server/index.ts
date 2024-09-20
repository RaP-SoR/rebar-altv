import * as alt from 'alt-server';

import { useRebar } from '@Server/index.js';
import { FactionType, IFaction } from '../shared/IFaction.js';
import { Vector3 } from 'alt-server';
const Rebar = useRebar();

const factionAPI = await Rebar.useApi().getAsync('faction-api');

// Fraktion by ID ermitteln :

const targetFaction = await factionAPI.getById('5f7d1b3b3');
targetFaction.settings.maxMembers = 10;

// Fraktion hinzufügen :
const faction: IFaction = {
    _id: 'test-1111',
    name: 'DeineMudda',
    shortName: 'DieDicke',
    factionId: 6,
    active: true,
    type: FactionType.Civilian,
    rankNames: ['DieDünne', 'DieDicke', 'Mannsweib'],
    members: [{ name: 'Mav', id: 'e142dsggws5212' }],
    pos: {
        spawn: new Vector3(0, 0, 0),
        enter: new Vector3(0, 0, 0),
        exit: new Vector3(0, 0, 0),
    },
    settings: {
        maxMembers: 500,
        maxVehicles: 0, // Zu fett
        maxWeapons: 0, // brauch keine ist schon bewaffnet mit dem Bauch
        gangwar: false, // Ne keine Chance die anderen
    },
};

factionAPI.addFaction(faction);
