import { useApi } from '@Server/api/index.js';
import * as alt from 'alt-server';

const VitalityAPI = await useApi().getAsync('ascended-vitality-api');
const Charselector = await useApi().getAsync('character-select-api');

Charselector.onSelect((player: alt.Player) => {
    VitalityAPI.createVitalityData(player);
    VitalityAPI.startDecreasingValues(player);
});
