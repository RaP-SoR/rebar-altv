<template>
    <div
        class="tuning-container mx-auto flex h-screen w-screen flex-col items-center justify-between bg-gradient-to-r from-slate-950 via-transparent to-slate-950"
    >
        <div class="tuning-main flex h-[80%] w-screen flex-row justify-between overflow-hidden">
            <LeftSidebar
                :categories="filteredCategories"
                @updateActiveIndex="updateActiveIndex"
                @mouseover="browsingCategory = true"
                @mouseleave="browsingCategory = false"
            />
            <RightSidebar :cartItems="currentCart" />
        </div>
        <div class="tuning-part-selection relative bottom-0 flex h-[20%] w-screen items-center">
            <div class="part-color absolute -top-3 left-1/2 -translate-x-1/2 transform" v-if="activeIndex === 66">
                <input class="bg-transparent" type="color" v-model="selectedPrimaryColor" @input="changePrimaryColor" />
            </div>
            <div class="part-color absolute -top-3 left-1/2 -translate-x-1/2 transform" v-if="activeIndex === 67">
                <input
                    class="bg-transparent"
                    type="color"
                    v-model="selectedSecondaryColor"
                    @input="changeSecondaryColor"
                />
            </div>
            <div class="part-color absolute -top-3 left-1/2 -translate-x-1/2 transform" v-if="activeIndex === 68">
                <input class="bg-transparent" type="color" v-model="selectedNeonColor" @input="changeNeonColor" />
            </div>
            <PartsContainer :parts="parts" :activeIndex="activeIndex" @updateCartItems="updateCartItems" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useEvents } from '../../../../webview/composables/useEvents';
import { TuningEvents } from '../shared/events';
import { TuningParts } from '../shared/tuningParts';
import { TuningConfig } from '../shared/config';

import LeftSidebar from './components/LeftSidebar.vue';
import RightSidebar from './components/RightSidebar.vue';
import PartsContainer from './components/PartsContainer.vue';

const currentCart = ref<Array<{ type: number; mod: number }>>([]);
const categories = ref(TuningParts);
let browsingCategory = ref(false);

const parts = ref<Array<{ maxMods: number; index: number }>>([]);
const vehicleCategories = ref();

let activeIndex = ref(0);
let selectedPrimaryColor = ref('#ffffff');
let selectedSecondaryColor = ref('#ffffff');
let selectedNeonColor = ref('#ffffff');

function updateActiveIndex(index: number) {
    activeIndex.value = index;
}

function updateCartItems(items: Array<{ type: number; mod: number }>) {
    currentCart.value = items;
}

const events = useEvents();

const filteredCategories = computed(() => {
    return categories.value.filter((category) => {
        const part = parts.value.find((p) => p.index === category.index);
        return part && part.maxMods > 0 && !TuningConfig.excluded_mods.includes(category.index);
    });
});

function changePrimaryColor(event) {
    events.emitServer(TuningEvents.ToServer.CHANGE_PRIMARY_COLOR, selectedPrimaryColor.value);
}

function changeSecondaryColor(event) {
    events.emitServer(TuningEvents.ToServer.CHANGE_SECONDARY_COLOR, event.target.value);
}

function changeNeonColor(event) {
    events.emitServer(TuningEvents.ToServer.CHANGE_NEON_COLOR, event.target.value);
}

onMounted(async () => {
    const result = await events.emitServerRpc(TuningEvents.RPC.REQUEST_MODS);
    parts.value = result;

    document.addEventListener('mousedown', (e) => {
        if (browsingCategory.value) {
            return;
        }

        events.emitClient('CAMERA_MOVE_START');
    });

    document.addEventListener('mouseup', (e) => {
        events.emitClient('CAMERA_MOVE_END');
    });

    document.addEventListener('wheel', (e) => {
        if (browsingCategory.value) {
            return;
        }

        if (e.deltaY < 0) {
            events.emitClient('CAMERA_SCROLL_UP');
        } else if (e.deltaY > 0) {
            events.emitClient('CAMERA_SCROLL_DOWN');
        }
    });
});
</script>
<style scoped>
.tuning-container {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}
</style>
