<template>
    <div class="gas-container flex h-screen w-screen flex-col items-center justify-center gap-5">
        <!-- Hero Section -->
        <div
            class="relative w-1/2 overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 px-10 py-5"
        >
            <div class="absolute left-0 top-0"><img class="w-full opacity-5 invert" src="../images/dots.svg" /></div>
            <Hero :model="vehicleModel" :currentFuel="vehicleCurrentFuel" :maxFuel="maxFuel" />
        </div>

        <!-- Fuel Type Selection -->
        <div
            class="relative w-1/2 overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 px-10 py-5"
        >
            <div class="absolute bottom-0 right-0 rotate-180">
                <img class="w-full opacity-5 invert" src="../images/dots.svg" />
            </div>
            <div class="gas-fuel-types relative z-10 flex w-full flex-col gap-2">
                <div>
                    <p class="mb-2 block text-xl font-thin uppercase text-white">
                        Select <span class="font-bold">Fuel Type</span>
                    </p>
                    <div class="-mt-2 h-[1px] w-[120px] bg-gradient-to-r from-zinc-400 to-zinc-300/0"></div>
                </div>
                <div class="fuel-types-container overflow-x-auto pb-3">
                    <div class="mt-2 flex flex-row flex-nowrap gap-5">
                        <Fueltype
                            v-for="(fuel, index) in availableTypes"
                            :key="index"
                            :type="fuel.label"
                            :price="fuel.price"
                            :class="[fuelColors[fuel.label], { 'gas-selected': selectedFuel === fuel.label }]"
                            @select-fuel="handleFuelSelection"
                        />
                    </div>
                </div>
            </div>

            <!-- Fuel Amount and Price Information -->
            <div class="relative z-10 mt-10 flex w-full flex-col gap-2">
                <div>
                    <p class="mb-2 block text-xl font-thin uppercase text-white">
                        How much <span class="font-bold">Fuel</span> do you need?
                    </p>
                    <div class="-mt-2 h-[1px] w-[200px] bg-gradient-to-r from-zinc-400 to-zinc-300/0"></div>
                </div>

                <!-- Fuel Amount Selection -->
                <div class="mt-2 flex flex-row">
                    <div class="flex w-full flex-row gap-3 rounded-l-md border border-zinc-700 bg-zinc-600/20 p-4">
                        <!-- Fuel Amount Selection Input -->
                        <div class="rounded-md bg-purple-500 p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                <path
                                    fill="white"
                                    d="M18 10a1 1 0 0 1-1-1a1 1 0 0 1 1-1a1 1 0 0 1 1 1a1 1 0 0 1-1 1m-6 0H6V5h6m7.77 2.23l.01-.01l-3.72-3.72L15 4.56l2.11 2.11C16.17 7 15.5 7.93 15.5 9a2.5 2.5 0 0 0 2.5 2.5c.36 0 .69-.08 1-.21v7.21a1 1 0 0 1-1 1a1 1 0 0 1-1-1V14a2 2 0 0 0-2-2h-1V5a2 2 0 0 0-2-2H6c-1.11 0-2 .89-2 2v16h10v-7.5h1.5v5A2.5 2.5 0 0 0 18 21a2.5 2.5 0 0 0 2.5-2.5V9c0-.69-.28-1.32-.73-1.77"
                                />
                            </svg>
                        </div>
                        <input
                            v-model="fuelAmount"
                            type="range"
                            min="0.0"
                            :max="getAvailableFuel.toFixed(2)"
                            step="0.01"
                            value="0"
                            class="w-full accent-purple-500"
                        />
                    </div>
                    <!-- Display selected fuel amount and total available fuel -->
                    <div
                        class="flex min-w-fit items-center justify-center rounded-r-md border border-zinc-700 bg-purple-500 px-5"
                    >
                        <p class="flex w-fit items-center justify-center text-xl uppercase text-white">
                            {{ fuelAmount }} / {{ getAvailableFuel.toFixed(2) }} LITERS
                        </p>
                    </div>
                </div>

                <!-- Display total price information -->
                <div class="mt-2 flex flex-row">
                    <div
                        class="flex w-full flex-row items-center justify-between rounded-md border border-zinc-700 bg-zinc-600/20 p-4"
                    >
                        <h2 class="text-2xl font-thin text-white">
                            TOTAL <span class="font-bold">PRICE <br />FOR FUEL</span>
                        </h2>
                        <h2 class="text-5xl font-bold text-green-500">${{ getPrice }}</h2>
                    </div>
                </div>

                <!-- Refuel Button -->
                <div class="mt-2 flex flex-col items-end py-2">
                    <div
                        @click="refuel"
                        class="text-1xl rounded-md border border-white/20 bg-gradient-to-tl from-green-300/60 to-green-600/60 px-8 py-2 uppercase text-white"
                    >
                        Refuel
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useEvents } from '@Composables/useEvents';
import { computed, ref } from 'vue';
import { FuelStationEvents } from '../shared/events';

import Hero from './components/hero.vue';
import Fueltype from './components/fueltype.vue';

const events = useEvents();

const availableTypes = ref([]);
const selectedFuel = ref('');
const fuelAmount = ref(0);
const maxFuel = ref(100);
const vehicleModel = ref('zentorno');
const vehicleCurrentFuel = ref(20);
const vehicleFuelType = ref('Benzin');
const fuelColors = {
    Gasolin: 'from-red-500',
    Diesel: 'from-lime-300',
    Electric: 'from-blue-600',
    Kerosin: 'from-zinc-600',
};

const handleFuelSelection = (fuel: string) => {
    selectedFuel.value = fuel;
};

const refuel = () => {
    console.log(`Refueling ${fuelAmount.value} liters of ${selectedFuel.value}.`);

    events.emitServer(FuelStationEvents.ToServer.REFILL_VEHICLE, fuelAmount.value, selectedFuel.value, getPrice.value);
};

const getAvailableFuel = computed(() => {
    const maxFuelFloat = parseFloat(maxFuel.value as unknown as string);
    const vehicleCurrentFuelFloat = parseFloat(vehicleCurrentFuel.value as unknown as string);

    if (isNaN(maxFuelFloat) || isNaN(vehicleCurrentFuelFloat)) {
        console.error('Invalid maxFuel or vehicleCurrentFuel value');
        return 0;
    }

    return maxFuelFloat - vehicleCurrentFuelFloat;
});

const getPrice = computed(() => {
    return (
        fuelAmount.value * (availableTypes.value.find((fuel) => fuel.label === selectedFuel.value)?.price || 0)
    ).toFixed(2);
});

events.on(
    FuelStationEvents.WebView.SET_DATA,
    (
        data: { fuelType: string; maxFuel: number; fuel: number },
        fuelStations: [{ [key: string]: { name: string; price: number } }],
        model: string,
    ) => {
        vehicleFuelType.value = data.fuelType;
        maxFuel.value = data.maxFuel;
        vehicleCurrentFuel.value = data.fuel;
        vehicleModel.value = model;

        const fuelStationsData = fuelStations.length > 0 ? fuelStations[0] : {};

        availableTypes.value = Object.keys(fuelStationsData).map((key) => ({
            label: fuelStationsData[key].name,
            price: fuelStationsData[key].price,
        }));

        if (availableTypes.value.length > 0) {
            selectedFuel.value = availableTypes.value[0].label;
        }
    },
);
</script>

<style scoped>
.gas-container {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}

.fuel-types-container::-webkit-scrollbar {
    background-color: #0b0f19b7;
    height: 5px;
}

.fuel-types-container::-webkit-scrollbar-thumb {
    background-color: #787c86b7;
    border-radius: 1rem;
    transition: background-color ease 0.2s;
}

.fuel-types-container::-webkit-scrollbar-thumb:hover {
    background-color: #494c55b7;
}

.Fueltype {
    flex: 0 0 calc(33.33% - 1.25rem);
    max-width: calc(33.33% - 1.25rem);
}
</style>
