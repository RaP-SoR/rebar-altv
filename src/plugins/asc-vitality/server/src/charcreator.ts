import { useApi } from '@Server/api/index.js';
import * as alt from 'alt-server';

const VitalityAPI = await useApi().getAsync('ascended-vitality-api');
const Charcreator = await useApi().getAsync('character-creator-api');

Charcreator.onCreate((player: alt.Player) => {
    VitalityAPI.createVitalityData(player);
    VitalityAPI.startDecreasingValues(player);
});
