import { useApi } from '@Server/api/index.js';
import './src/api.js';

const VitalityAPI = await useApi().getAsync('ascended-vitality-api');

if (VitalityAPI.getVitalityConfig().useCharcreator) {
    await import('./src/charcreator.js');
}

if (VitalityAPI.getVitalityConfig().useCharselector) {
    await import('./src/charselect.js');
}
