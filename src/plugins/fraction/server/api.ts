import { useRebar } from '@Server/index.js';
import { IFaction } from '../shared/IFaction.js';

const API_NAME = 'faction-api';
const COLLECTION_NAME = 'factions';
const Rebar = useRebar();

function useApi() {
    function addFaction(faction: IFaction) {
        // Erstelle eine Fraktion
    }

    function delFaction(factionId: string | number) {
        if (typeof factionId === 'number') {
            // Lösche Fraktion anhand der FraktionID
        }
        if (typeof factionId === 'string') {
            // Lösche Fraktion anhand der DatenbankId(ObjectID MongdDB gespeichert als String)
        }
    }
    async function getById(id: string): Promise<IFaction | undefined> {
        // Gibt Fraktion anhand des Namens zurück
        const document = await Rebar.document.virtual.useVirtual<IFaction>(id, COLLECTION_NAME).get();
        if (!document) {
            return undefined;
        }
        return document;
    }

    return {
        addFaction,
        delFaction,
        getById,
    };
}

declare global {
    export interface ServerPlugin {
        [API_NAME]: ReturnType<typeof useApi>;
    }
}

Rebar.useApi().register(API_NAME, useApi());
