<template>
    <div class="app-item" @click="appClicked(name)">
        <q-badge v-if="badge > 0" class="badge" rounded color="red" :label="badge" />
        <div class="item-img">
            <img :src="image" />
        </div>
        <div class="app-name">{{ name }}</div>
    </div>
</template>
<script setup>
import { computed, defineProps } from 'vue';
import { QBadge } from 'quasar';
const appClicked = (name) => {
    console.log('App clicked :', name);
};

const props = defineProps({
    id: Number,
    name: String,
    image: {
        type: String,
        default: `../images/app-default.png`,
    },
    badge: {
        type: Number,
        default: 0,
    },
});
</script>
<style scoped>
.app-item {
    width: 23%; /* 10% der Containerbreite */
    height: 8vh; /* Höhe in Bezug auf die Viewport-Breite */
    background-color: #ccc3c300; /* Beispielhintergrundfarbe */
    border-radius: 5%; /* Runde Ecken */
    margin: 3% 0 0 2%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end; /* Text am unteren Rand */
    align-items: center; /* Text zentriert */
    text-align: center; /* Text zentriert */
    color: white;
    position: relative;
    transition:
        transform 0.3s,
        background-color 0.3s;
}

.app-item:hover {
    cursor: pointer; /* Zeigt die Hand als Mauszeiger */
    transform: scale(1.15); /* Vergrößert das Element leicht */
    background-color: rgba(255, 255, 255, 0.164); /* Ändert die Hintergrundfarbe */
    font-weight: bold;
}
.badge {
    position: absolute;
    top: 5px; /* Abstand von oben */
    right: 5px; /* Abstand von rechts */
}
.item-img {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item-img img {
    width: 70%;
    height: 80%;
    object-fit: cover; /* Bild an die Größe der Box anpassen */
}
.app-name {
    font-size: 0.5vw; /* Schriftgröße relativ zur Viewport-Breite */
    margin-bottom: 2px; /* Abstand vom unteren Rand */
}
</style>
