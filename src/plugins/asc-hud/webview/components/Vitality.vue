<template>
    <div class="vitality-container ml-2 flex flex-col gap-2">
        <Health :health="health" />
        <Armour v-if="armour > 0" :armour="armour" />
        <Hunger :hunger="hunger" />
        <Thirst :thirst="thirst" />
        <Pee :pee="pee" />
        <Shower :shower="shower" />
        <Shit :shit="shit" />
    </div>
</template>

<script setup>
import Health from './vitals/health.vue';
import Armour from './vitals/armour.vue';
import Hunger from './vitals/hunger.vue';
import Thirst from './vitals/thirst.vue';
import Pee from './vitals/pee.vue';
import Shower from './vitals/shower.vue';
import Shit from './vitals/shit.vue';
const { health, armour, hunger, thirst, pee, shower, shit } = defineProps([
    'health',
    'armour',
    'hunger',
    'thirst',
    'pee',
    'shower',
    'shit',
]);
</script>

<style>
.vitals {
    height: calc(1vh * 4);
    width: calc(1vh * 4);
}

.vitals svg {
    height: calc(1vh * 2.5);
    width: calc(1vh * 2.5);
}
</style>
