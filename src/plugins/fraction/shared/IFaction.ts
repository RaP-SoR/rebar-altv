import { Vector3 } from 'alt-shared';

export interface IFaction {
    _id: string; // MongoDB ID
    name: string;
    shortName: string; // Abkürzung
    factionId: number; // FraktionID muss eindeutig sein und selbst zugewiesen werden
    active: boolean; // Fraktion aktiviert
    type: FactionType; // Fraktion oder Gang
    rankNames: Array<{ rank: number; name: string }>;
    members: Array<{ name: string; id: string }>; // SpielerName & ID exp { name: 'Habib', id: 'e142dsggws5212' }
    pos: {
        blip?: Vector3;
        marker?: Vector3;
        spawn: Vector3;
        enter: Vector3;
        exit: Vector3;
        garage?: Vector3;
    };
    color?: {
        blip: number;
        marker: number;
        gangwar: number;
    };
    settings: {
        maxMembers?: number; // Maximale Anzahl an Mitgliedern
        maxVehicles?: number; // Maximale Anzahl an Fahrzeugen
        maxWeapons?: number; // Maximale Anzahl an Waffen
        gangwar?: boolean; // Gangwar aktivieren
    };
    weapons?: Array<{ name: string; ammo: number }>; // Waffen die die Fraktion benutzen darf
    vehicles?: Array<string>; // Fahrzeuge die die Fraktion benutzen darf
}

export enum FactionType {
    Civilian,
    Government, // Regierung
    State, // Staat
    Gang,
    Mafia,
    Terror,
}
