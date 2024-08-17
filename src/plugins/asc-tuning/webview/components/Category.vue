<template>
    <div class="categorie-container group cursor-pointer">
        <div
            class="categorie flex items-center gap-3 border-l-2 border-solid border-l-transparent from-purple-950/30 to-transparent pl-10 transition-all duration-200 ease-linear group-hover:border-l-purple-700/60 group-hover:bg-gradient-to-r group-[.active]:border-l-purple-700/60 group-[.active]:bg-gradient-to-r"
        >
            <div class="categorie-icon-container transition-all duration-200 ease-linear">
                <div
                    class="categorie-icon w-16 bg-slate-700 p-0.5 transition-all duration-200 ease-linear group-hover:bg-purple-500 group-[.active]:bg-purple-500"
                >
                    <div class="categorie-image bg-slate-800 px-1 transition-all duration-200 ease-linear">
                        <img :src="icon" />
                    </div>
                </div>
            </div>
            <div class="categorie-title">
                <h3 class="-mb-1 text-xs font-medium text-slate-500">RETROFIT</h3>
                <h2 class="font-semibold uppercase text-white">{{ category }}</h2>
            </div>
        </div>
    </div>
</template>

<script setup>
const { icon, category } = defineProps(['icon', 'category']);
</script>

<style>
.active .categorie-icon-container,
.categorie-container:hover .categorie-icon-container {
    filter: drop-shadow(0px 0px 30px purple);
}

.categorie-icon,
.categorie-image {
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

.active .categorie-image,
.categorie-container:hover .categorie-image {
    background: radial-gradient(circle, rgba(198, 140, 249, 1) 0%, rgb(103, 17, 179) 80%) !important;
}
</style>
