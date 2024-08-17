import * as alt from 'alt-server';
import { useApi } from '@Server/api/index.js';
import { useRebar } from '@Server/index.js';
import { VitalityConfig } from '../../shared/config.js';

const Rebar = useRebar();

export function useVitalityAPI() {
    function createVitalityData(player: alt.Player) {
        if (!player?.valid) return;

        const rebarPlayer = Rebar.document.character.useCharacter(player);
        const vitalityData = getVitalityData(player);

        if (!vitalityData) {
            rebarPlayer.setBulk({
                ascendedVitality: {
                    hunger: 100,
                    thirst: 100,
                    pee: 100,
                    shower: 100,
                    shit: 100,
                },
            });

            const playerDocument = rebarPlayer.get();

            alt.logWarning(
                `Created Vitality Data for ${playerDocument.name}! Hunger: ${playerDocument.ascendedVitality.hunger} <|> Thirst: ${playerDocument.ascendedVitality.thirst}`,
            );
        }
    }

    function startDecreasingValues(player: alt.Player) {
        if (!player?.valid) return;

        const decreaseInterval = setInterval(() => {
            const vitalityData = getVitalityData(player);

            if (vitalityData) {
                const newHunger = parseFloat(
                    Math.max(0, vitalityData.hunger - VitalityConfig.hungerDecreaseRate).toFixed(2),
                );
                const newThirst = parseFloat(
                    Math.max(0, vitalityData.thirst - VitalityConfig.thirstDecreaseRate).toFixed(2),
                );
                const newPee = parseFloat(Math.max(0, vitalityData.pee - VitalityConfig.peeDecreaseRate).toFixed(2));
                const newShower = parseFloat(
                    Math.max(0, vitalityData.shower - VitalityConfig.showerDecreaseRate).toFixed(2),
                );
                const newShit = parseFloat(Math.max(0, vitalityData.shit - VitalityConfig.shitDecreaseRate).toFixed(2));

                updateVitalityRates(player, vitalityData);

                if (newHunger === 0) {
                    clearInterval(decreaseInterval);
                }
                if (newThirst === 0) {
                    clearInterval(decreaseInterval);
                }
            } else {
                clearInterval(decreaseInterval);
            }
        }, VitalityConfig.updateInterval);
    }

    function updateVitalityRates(player: alt.Player, vitalityData: Object) {
        if (!player?.valid) return;

        const rebarPlayer = Rebar.document.character.useCharacter(player);

        rebarPlayer.setBulk({
            ascendedVitality: vitalityData,
        });
    }

    function getVitalityData(player: alt.Player) {
        if (!player?.valid) return false;

        const rebarPlayer = Rebar.document.character.useCharacter(player);
        const playerDocument = rebarPlayer.get();

        return playerDocument.ascendedVitality;
    }

    function getVitalityConfig() {
        return VitalityConfig;
    }

    return {
        createVitalityData,
        getVitalityData,
        startDecreasingValues,
        getVitalityConfig,
    };
}

declare global {
    export interface ServerPlugin {
        ['ascended-vitality-api']: ReturnType<typeof useVitalityAPI>;
    }
}

useApi().register('ascended-vitality-api', useVitalityAPI());
