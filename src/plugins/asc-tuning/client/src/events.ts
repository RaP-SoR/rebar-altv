import * as alt from 'alt-client';
import * as native from 'natives';

import { TuningEvents } from '../../shared/events.js';
import { useClientApi } from '@Client/api/index.js';
import { useWebview } from '@Client/webview/index.js';

const Webview = useWebview();

const CameraAPI = useClientApi().get('ascended-camera-api');

alt.onServer(TuningEvents.ToClient.DISABLE_CONTROLS, (state: boolean) => {
    CameraAPI.onMovementControl(state);
});

alt.onRpc(TuningEvents.ToClient.GET_WHEELS, () => {
    return native.getNumVehicleMods(alt.Player.local.vehicle, 23);
});

Webview.onRpc(TuningEvents.RPC.GET_MOD_LABEL, (propIndex: number, index: number) => {
    const textLabel = native.getModTextLabel(alt.Player.local.vehicle.scriptID, propIndex, index);
    const modName = native.getFilenameForAudioConversation(textLabel);

    if (modName) {
        return modName;
    }

    return undefined;
});
