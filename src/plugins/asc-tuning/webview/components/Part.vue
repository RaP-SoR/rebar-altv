<template>
    <div
        class="part-container h-30 relative cursor-pointer border-[1px] border-solid border-white/20 bg-gradient-to-t from-slate-950/80 to-slate-600/90 sm:w-[295px] md:w-[278px] lg:w-[245.72px] xl:lg:w-[245.72px]"
    >
        <div
            v-if="installed"
            class="part-installed absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
        >
            <p class="text-2xl font-bold text-white">Installed</p>
        </div>
        <div class="part-data flex flex-row justify-between">
            <h1 class="w-full bg-purple-500 px-2 py-0.5 text-center text-sm font-bold text-white">{{ part }}</h1>
        </div>
        <div class="part-image flex w-full items-center justify-center">
            <img :src="icon" />
        </div>
        <div class="part-price absolute bottom-0">
            <span class="w-full px-2 py-0.5 text-center text-white">${{ price }}</span>
        </div>
    </div>
</template>

<script setup>
const { icon, part, installed } = defineProps(['icon', 'part', 'installed', 'price']);
</script>

<style>
.selected,
.part-container:hover {
    background: linear-gradient(to bottom, rgba(134, 45, 213, 0.8) 0%, rgba(102, 0, 127, 0.7) 100%);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

@-webkit-keyframes pulse {
    0% {
        background: rgba(0, 248, 185, 0.1);
    }

    70% {
        background: rgba(0, 248, 185, 0.2);
    }

    to {
        background: rgba(0, 248, 185, 0.08);
    }
}
</style>
