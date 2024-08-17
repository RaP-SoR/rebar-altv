<template>
    <div class="parts-container mx-10 flex w-full flex-grow flex-row gap-5 overflow-x-auto">
        <div class="parts-wrapper mb-5 flex flex-shrink-0 flex-grow gap-5">
            <Part
                v-for="(mod, idx) in modNames"
                :class="idx === selectedPart ? 'selected' : null"
                :key="idx"
                :part="mod"
                :icon="`../images/${getPartByIndex(parts[activeIndex].index)}.png`"
                :installed="idx === selectedPart"
                :price="modPrices[idx]"
                @click="changeSelected(parts[activeIndex].index, idx)"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref, watchEffect, watch } from 'vue';
import { TuningEvents } from '../../shared/events';
import { TuningParts, modPrices } from '../../shared/tuningParts';
import { useEvents } from '../../../../../webview/composables/useEvents';
import Part from './Part.vue';

const props = defineProps({
    activeIndex: {
        type: Number,
        required: true,
    },
    parts: {
        type: Array as () => Array<{ index: number; maxMods: number }>,
        required: true,
    },
});

const emit = defineEmits(['updateCartItems']);

const currentCart = ref<Array<{ type: number; mod: number; name: string; price: number }>>([]);
const selectedPart = ref(0);
const modNames = ref<Array<string>>([]);
const events = useEvents();

let isInitialized = false;

function changeSelected(index: number, activeIndex: number) {
    selectedPart.value = activeIndex;

    const modName = modNames.value[activeIndex];
    const existingIndex = currentCart.value.findIndex((item) => item.type === index);
    if (existingIndex !== -1) {
        currentCart.value[existingIndex] = {
            type: index,
            mod: activeIndex,
            name: modName,
            price: modPrices[activeIndex],
        };
    } else {
        currentCart.value.push({ type: index, mod: activeIndex, name: modName, price: modPrices[activeIndex] });
    }

    emit('updateCartItems', currentCart.value);

    events.emitServer(TuningEvents.ToServer.INSTALL_MOD, index, activeIndex);
}

function getPartByIndex(index: number): string | undefined {
    const partObject = TuningParts.find((part) => part.index === index);
    return partObject ? partObject.part : undefined;
}

function getCategoryByIndex(index: number): string | undefined {
    const partObject = TuningParts.find((part) => part.index === index);
    return partObject ? partObject.category : undefined;
}

async function getModNameByClient(propIndex: number, index: number): Promise<string> {
    try {
        const result = await events.emitClientRpc(TuningEvents.RPC.GET_MOD_LABEL, propIndex, index - 1);
        return result;
    } catch (error) {
        console.error(`Error fetching mod name: ${error.message}`);
        return '';
    }
}

async function updateModNames() {
    if (props.parts[props.activeIndex]) {
        const activePart = props.parts[props.activeIndex];
        const names: string[] = ['REMOVE'];
        const maxMods = activePart.maxMods;

        for (let i = 1; i <= maxMods; i++) {
            const name = await getModNameByClient(activePart.index, i);

            if (!name || name === 'NULL') {
                names.push(`${getCategoryByIndex(activePart.index) ?? 'Unknown Category'} ${i}`);
            } else {
                names.push(name);
            }
        }

        modNames.value = names;
    }
}

watchEffect(async (onInvalidate) => {
    if (!isInitialized) {
        isInitialized = true;
    }
    await updateModNames();
});
</script>

<style>
.parts-container::-webkit-scrollbar {
    background-color: #0b0f19b7;
    height: 0.5rem;
}

.parts-container::-webkit-scrollbar-thumb {
    background-color: #8c0ee0;
    border-radius: 1rem;
    transition: background-color ease 0.2s;
}

.parts-container::-webkit-scrollbar-thumb:hover {
    background-color: #640d9e;
}
</style>
