import * as alt from 'alt-client';
import { VitalityEvents } from '../shared/events.js';

alt.setStat('lung_capacity', 100);
alt.setStat('stamina', 100);
alt.setStat('strength', 100);

// => Not Yet.
alt.onServer(VitalityEvents.SET_STAT, (stat: alt.StatName, value: number) => {
    alt.setStat(stat, value);
});
