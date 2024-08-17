<template>
    <div dir="ltr" class="cart-container group cursor-pointer">
        <div
            class="cart flex flex-row-reverse items-center justify-between gap-3 border-r-2 border-solid border-r-transparent from-purple-950/30 to-transparent pl-5 pr-10 transition-all duration-200 ease-linear group-hover:border-r-purple-700/60 group-hover:bg-gradient-to-l group-[.active]:border-r-purple-700/60 group-[.active]:bg-gradient-to-l"
        >
            <div class="cart-icon-container transition-all duration-200 ease-linear">
                <div
                    class="cart-icon w-16 bg-slate-700 p-0.5 transition-all duration-200 ease-linear group-hover:bg-purple-500 group-[.active]:bg-purple-500"
                >
                    <div class="cart-image bg-slate-800 px-1 transition-all duration-200 ease-linear">
                        <img :src="icon" />
                    </div>
                </div>
            </div>
            <div class="cart-title">
                <h3 class="-mb-1 text-xs font-medium text-slate-500">
                    {{ category.charAt(0).toUpperCase() + category.slice(1) }}
                </h3>
                <h2 class="font-semibold uppercase text-white">{{ modName }}</h2>
            </div>
            <div class="cart-price self-center">
                <p class="font-semibold uppercase text-red-400">${{ price }}</p>
            </div>
            <div class="cart-remove hidden group-hover:block">
                <div
                    class="cursor-pointer bg-gradient-to-t from-red-800 to-red-500 px-2 py-0.5 text-sm font-semibold text-white"
                >
                    X
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { icon, category, modName, price } = defineProps(['icon', 'category', 'modName', 'price']);
</script>

<style>
.active .cart-icon-container,
.cart-container:hover .cart-icon-container {
    filter: drop-shadow(0px 0px 30px purple);
}

.cart-icon,
.cart-image {
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

.active .cart-image,
.cart-container:hover .cart-image {
    background: radial-gradient(circle, rgba(198, 140, 249, 1) 0%, rgb(103, 17, 179) 80%) !important;
}
</style>
