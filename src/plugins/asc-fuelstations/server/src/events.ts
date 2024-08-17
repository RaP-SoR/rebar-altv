import { FuelStationEvents } from '../../shared/events.js';
import { useApi } from '@Server/api/index.js';
import { useRebar } from '@Server/index.js';
import { useWebview } from '@Server/player/webview.js';
import { PageNames } from '@Shared/webview/index.js';
import * as alt from 'alt-server';

const Rebar = useRebar();
const FuelAPI = await useApi().getAsync('ascended-fuel-api');
const CurrencyAPI = await useApi().getAsync('currency-api');

Rebar.events.useEvents().on('page-closed', (player: alt.Player, page: PageNames) => {
    if (typeof page !== 'undefined' && page === 'Fuelstations') {
        Rebar.player.useWorld(player).enableControls();
    }
});

alt.onClient(
    FuelStationEvents.ToServer.REFILL_VEHICLE,
    async (player: alt.Player, amount: string, type: string, price: number) => {
        const WebView = useWebview(player);
        console.log(`Price for ${amount}L of ${type} is: ${price}$!`);
        if (await CurrencyAPI.useCurrency(player, 'Character').sub('cash', price)) {
            await FuelAPI.refillCloseVehicle(player, parseFloat(amount), type, 1000);
            WebView.hide('Fuelstations');
            WebView.unfocus();
            Rebar.player.useWorld(player).enableControls();
        } else {
            alt.logWarning(`Not enough cash.`);
            WebView.hide('Fuelstations');
            WebView.unfocus();
            Rebar.player.useWorld(player).enableControls();
        }
    },
);
