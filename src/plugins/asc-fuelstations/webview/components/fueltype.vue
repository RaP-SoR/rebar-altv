<template>
    <div
        class="gas-fuel-type Fueltype flex flex-col items-center justify-between gap-10 rounded-xl border border-zinc-600 bg-gradient-to-t to-zinc-700/50 px-4 py-2"
    >
        <div class="flex w-full items-center justify-between">
            <div class="gas-fuel-title">
                <h2 class="text-3xl font-bold uppercase text-white">{{ type }}</h2>
                <span class="text-sm font-thin uppercase text-white/50">${{ price }} per Liter</span>
            </div>
            <div class="gas-fuel-icon -rotate-45 rounded-full bg-zinc-800 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g
                        fill="none"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        color="white"
                    >
                        <path
                            d="M10.112 4.5H8c-1.886 0-2.828 0-3.414.586S4 6.614 4 8.5V16c0 2.828 0 4.243.879 5.121C5.757 22 7.172 22 10 22h4c2.828 0 4.243 0 5.121-.879C20 20.243 20 18.828 20 16v-2.556c0-2.405 0-3.608-.597-4.575c-.598-.966-1.674-1.504-3.825-2.58l-1.889-.944c-.84-.42-1.261-.631-1.714-.738S11.052 4.5 10.11 4.5"
                        />
                        <path
                            d="M12 18c1.105 0 2-.84 2-1.875C14 14.875 12 13 12 13s-2 1.875-2 3.125C10 17.16 10.895 18 12 18m.5-10l4 2M6 4.5v-.75c0-.702 0-1.053.169-1.306a1 1 0 0 1 .275-.275C6.697 2 7.048 2 7.75 2s1.053 0 1.306.169a1 1 0 0 1 .275.275c.169.253.169.604.169 1.306v.75"
                        />
                    </g>
                </svg>
            </div>
        </div>
        <div
            @click="selectFuel(type)"
            class="fuel-select flex w-full cursor-pointer items-center justify-center rounded-lg border border-zinc-500/50 bg-zinc-800/80 p-1 text-white/50 transition-all duration-300 ease-in-out hover:bg-zinc-800"
        >
            SELECT FUEL
        </div>
    </div>
</template>

<script setup>
const { type, price } = defineProps(['type', 'price']);

const emit = defineEmits(['select-fuel']);

function selectFuel(type) {
    emit('select-fuel', type);
}
</script>

<style scoped>
.gas-selected .fuel-select {
    background-color: #a955f7cb;
}
</style>
