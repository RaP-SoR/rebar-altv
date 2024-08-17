<template>
    <div class="tuning-left flex flex-col py-10 pl-10 md:w-[20%] lg:w-[20%] xl:w-[20%]">
        <div class="dots absolute left-0 top-0">
            <img class="w-full opacity-5 invert" src="../../images/dots.svg" />
        </div>
        <div class="left-information mb-10 flex h-[20%] w-2/3 flex-col items-start">
            <div class="left-title mb-3 flex flex-col items-center">
                <h1
                    class="inline-block bg-gradient-to-t from-purple-800 via-purple-600 to-purple-900 bg-clip-text text-6xl font-extrabold text-transparent"
                >
                    TUNING
                </h1>
                <span class="text-1xl ml-5 inline-block uppercase tracking-[1em] text-white">Workshop</span>
            </div>
            <div class="left-description">
                <p class="text-sm text-gray-400">Here you have the opportunity to freshen up your car to your liking</p>
            </div>
        </div>
        <div class="tuning-categories -ml-10 flex flex-grow flex-col gap-5 overflow-y-auto">
            <div v-for="part in categories" :key="part.index">
                <Category
                    :category="part.category"
                    :icon="`../images/${part.part}.png`"
                    v-if="part.index === activeIndex"
                    class="active"
                />
                <Category
                    :category="part.category"
                    :icon="`../images/${part.part}.png`"
                    @click="selectActive(part.index)"
                    v-else
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEvents } from '../../../../../webview/composables/useEvents';
import Category from './Category.vue';

const { categories } = defineProps(['categories']);
const emit = defineEmits(['updateActiveIndex']);
const events = useEvents();

let activeIndex = ref(0);

function selectActive(index: number) {
    activeIndex.value = index;
    emit('updateActiveIndex', index);
}
</script>

<style>
.tuning-categories::-webkit-scrollbar {
    background-color: #0b0f19b7;
    width: 0.3125rem;
}

.tuning-categories::-webkit-scrollbar-thumb {
    background-color: #8c0ee0;
    border-radius: 1rem;
    transition: background-color ease 0.2s;
}

.tuning-categories::-webkit-scrollbar-thumb:hover {
    background-color: #640d9e;
}

.left-title h1 {
    filter: drop-shadow(0px 0px 30px purple);
    -webkit-text-stroke: 0.3px #ffffff47;
    text-stroke: 0.3px #ffffff47;
}
</style>
