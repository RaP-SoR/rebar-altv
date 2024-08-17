<template>
    <div class="tuning-right flex w-[20%] flex-col py-10 pr-10">
        <div class="right-information mb-10 flex h-[20%] flex-col items-end self-end">
            <div class="right-title mb-3 flex items-center justify-center gap-5">
                <h1 class="text-xs font-semibold uppercase text-gray-300">Close Menu</h1>
                <div
                    class="cursor-pointer bg-gradient-to-t from-red-800 to-red-500 px-3 py-1 font-bold text-white"
                    @click="closeTuning"
                >
                    X
                </div>
            </div>
            <div class="right-description flex flex-col items-end">
                <div class="flex flex-row items-center justify-center gap-2">
                    <p class="text-sm text-gray-400">Change the view angle</p>
                    <img class="w-2" src="../../images/LeftClick.svg" />
                </div>
                <div class="flex flex-row items-center justify-center gap-2">
                    <p class="text-sm text-gray-400">Zoom in/out</p>
                    <img class="w-2" src="../../images/MiddleClick.svg" />
                </div>
            </div>
        </div>
        <div dir="rtl" class="tuning-cart-items -mr-10 flex flex-grow flex-col gap-5 overflow-y-auto">
            <CartItem
                v-for="(item, index) in cartItems"
                :key="index"
                :category="getPartByIndex(item.type)"
                :mod-name="item.name"
                :price="item.price"
                :icon="`../images/${getPartByIndex(item.type)}.png`"
            />
        </div>
        <div class="tuning-buy mt-10 w-full">
            <div class="tuning-price flex items-center justify-between">
                <p class="text-sm text-gray-400">TOTAL PRICE</p>
                <p class="font-bold text-white">$0</p>
            </div>
            <button
                class="tuning-buy-btn ring-offset-background bg-primary hover:bg-primary/90 inline-flex h-16 w-full items-center justify-center whitespace-nowrap rounded-sm bg-gradient-to-r from-[#9333EA] to-[#7C3AED] px-6 py-3 text-base font-medium text-white shadow-md transition-colors hover:from-[#7E22CE] hover:to-[#6D28D9] focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                @click="buyTuning(cartItems)"
            >
                BUY TUNING PARTS
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TuningParts } from '../../shared/tuningParts';
import { TuningEvents } from '../../shared/events';
import { useEvents } from '../../../../../webview/composables/useEvents';
import CartItem from './CartItem.vue';

const { categories, cartItems } = defineProps(['categories', 'cartItems']);
const events = useEvents();

function buyTuning(cartItems) {
    events.emitServer(TuningEvents.ToServer.BUY_TUNING, cartItems);
}

function closeTuning() {
    events.emitServer(TuningEvents.ToServer.CLOSE);
    events.emitClient(TuningEvents.ToClient.CLOSE);
}

function getPartByIndex(index: number): string | undefined {
    const partObject = TuningParts.find((part) => part.index === index);
    return partObject ? partObject.part : undefined;
}
</script>

<style>
.tuning-cart-items::-webkit-scrollbar {
    background-color: #0b0f19b7;
    width: 0.3125rem;
}

.tuning-cart-items::-webkit-scrollbar-thumb {
    background-color: #8c0ee0;
    border-radius: 1rem;
    transition: background-color ease 0.2s;
}

.tuning-cart-items::-webkit-scrollbar-thumb:hover {
    background-color: #640d9e;
}

.tuning-buy-btn {
    filter: drop-shadow(0px 0px 30px rgba(87, 0, 128, 0.459));
}
</style>
