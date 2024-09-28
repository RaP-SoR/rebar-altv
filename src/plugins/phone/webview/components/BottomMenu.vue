<template>
    <div class="bottom-menu">
        <q-btn-group unelevated spread stretch>
            <q-btn color="black" :icon="fasChevronLeft" @click="goBack" />
            <q-btn color="black" :icon="fasHouse" @click="goHome" />
            <q-btn color="black" :icon="fasEllipsis" @click="goApps" />
        </q-btn-group>
    </div>
</template>

<script setup>
import { QBtn } from 'quasar';
import { fasHouse, fasEllipsis, fasChevronLeft } from '@quasar/extras/fontawesome-v6';
const goHome = () => {
    console.log('Home button clicked');
};

const goBack = () => {
    console.log('Search button clicked');
};

const goApps = () => {
    console.log('Settings button clicked');
};
</script>

<style scoped>
.bottom-menu {
    width: 100%;
    height: 6%;
    overflow: hidden;
    border-radius: 0px 0px 5px 5px;
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>
