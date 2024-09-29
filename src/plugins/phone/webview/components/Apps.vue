<template>
    <div class="apppage-container" style="background-image: url('../images/bg-default.jpg')">
        <div class="app-container">
            <AppItem
                @click="navigateToApp(app.name)"
                v-for="app in apps"
                :key="app.id"
                :name="app.name"
                :image="app.image"
                :badge="2"
            />
        </div>
    </div>
</template>

<script setup>
import AppItem from './AppItem.vue';
import { defineProps, ref, onMounted } from 'vue';
import appsData from '../apps.json';
import { useRouter } from 'vue-router';
import Settings from './apps/Settings.vue';
const apps = ref([]);

const router = useRouter();

const navigateToApp = (name) => {
    router.push({ path: `/apps/${name}` });
    console.log('Navigating to app:', name);
};
onMounted(() => {
    apps.value = appsData;
    router.addRoute('settting', { path: '/apps/Settings', component: Settings });
});

const props = defineProps({
    name: String,
    image: {
        type: String,
        default: './images/app-default.jpg',
    },
    badge: {
        type: Number,
        default: 10,
    },
});
</script>
<style scoped>
.apppage-container {
    width: 100%;
    height: 90%;
    background-color: #f9f9f9;
    overflow: hidden;
    background-size: cover;
    background-position: center;
}
.app-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%; /* Container nimmt die volle Breite ein */
    height: auto; /* Höhe passt sich dem Inhalt an */
    justify-content: flex-start; /* Elemente von links nach rechts anordnen */
    align-items: flex-start; /* Elemente am oberen Rand ausrichten */
}
</style>
