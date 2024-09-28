<template>
    <div class="q-gutter-sm">
        <q-bar dense class="bg-black text-white">
            <div>{{ netz }}</div>
            <q-space />
            <q-icon :name="fasSignal" />
            <div>{{ connectionTyp }}</div>
            <q-icon :name="fasWifi" />
            <q-space />
            <div>{{ battery }}%</div>
            <q-icon :name="batteryIcon" />
        </q-bar>
    </div>
</template>

<script setup>
import {
    fasBatteryEmpty,
    fasBatteryQuarter,
    fasBatteryHalf,
    fasBatteryThreeQuarters,
    fasBatteryFull,
    fasSignal,
    fasWifi,
} from '@quasar/extras/fontawesome-v6';

import { defineProps, computed } from 'vue';

const props = defineProps({
    netz: String,
    signal: Number,
    connectionTyp: String,
    wifi: Boolean,
    battery: Number,
});

const batteryIcon = computed(() => {
    if (props.battery >= 90) {
        return fasBatteryFull;
    } else if (props.battery >= 70) {
        return fasBatteryThreeQuarters;
    } else if (props.battery >= 50) {
        return fasBatteryHalf;
    } else if (props.battery >= 25) {
        return fasBatteryQuarter;
    } else {
        return fasBatteryEmpty;
    }
});
</script>
