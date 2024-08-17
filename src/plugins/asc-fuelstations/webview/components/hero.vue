<template>
    <div class="flex items-center justify-between">
        <div class="gas-title w-full">
            <h1 class="mb-2 text-6xl text-white"><span class="font-bold">GAS</span> STATION</h1>
            <p class="font-thin text-gray-400">
                Welcome to the future of fuel, <br />where your car doesn't just drive, it dances!
            </p>
            <div class="mt-2 h-[1px] w-[200px] bg-gradient-to-r from-zinc-400 to-zinc-300/0"></div>
        </div>
        <div class="gas-vehicle w-full">
            <div
                class="flex w-full flex-row items-center justify-around gap-2 rounded-xl border border-zinc-700 bg-gradient-to-t from-purple-500/20 to-zinc-600/20 py-5"
            >
                <div class="gas-vehicle-data">
                    <h3 class="-mb-2 uppercase text-white">YOUR VEHICLE</h3>
                    <h2 class="text-xl font-bold uppercase text-white">{{ props.model }}</h2>
                </div>
                <div class="w-fit">
                    <img
                        :src="`https://cdn.jsdelivr.net/gh/Stuyk/gtav-image-archive/vehicles/${model}.webp`"
                        alt="image"
                        class="h-20 scale-x-[-1]"
                    />
                </div>
            </div>
            <div
                class="mt-2 flex flex-row items-center gap-2 rounded-md border border-zinc-700 bg-zinc-600/20 text-white"
            >
                <div class="bg-zinc-600/20 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="white"
                            d="M18 10a1 1 0 0 1-1-1a1 1 0 0 1 1-1a1 1 0 0 1 1 1a1 1 0 0 1-1 1m-6 0H6V5h6m7.77 2.23l.01-.01l-3.72-3.72L15 4.56l2.11 2.11C16.17 7 15.5 7.93 15.5 9a2.5 2.5 0 0 0 2.5 2.5c.36 0 .69-.08 1-.21v7.21a1 1 0 0 1-1 1a1 1 0 0 1-1-1V14a2 2 0 0 0-2-2h-1V5a2 2 0 0 0-2-2H6c-1.11 0-2 .89-2 2v16h10v-7.5h1.5v5A2.5 2.5 0 0 0 18 21a2.5 2.5 0 0 0 2.5-2.5V9c0-.69-.28-1.32-.73-1.77"
                        />
                    </svg>
                </div>
                <div class="min-w-fit">Fuel Level:</div>
                <div class="progressbar mr-2 h-[10px] w-full rounded-sm">
                    <div class="bar h-[10px] rounded-sm bg-purple-500" :style="{ width: fuelPercentage + '%' }"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps(['model', 'currentFuel', 'maxFuel']);

const fuelPercentage = computed(() => {
    return ((props.currentFuel / props.maxFuel) * 100).toFixed(0);
});
</script>

<style lang="scss" scoped></style>
