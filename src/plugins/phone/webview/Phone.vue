<template>
    <div
        :class="['phone-frame', { 'dynamic-frame': isDynamic }]"
        :style="[frameStyle, positionStyle, backgroundImageStyle]"
    >
        <div class="phone-container">
            <!-- Inhalt des Telefons hier -->
            <TopBar
                :netz="$props.netz"
                :signal="$props.signal"
                :connectionTyp="$props.connectionTyp"
                :wifi="$props.wifi"
                :battery="$props.battery"
            />
            <Apps key="1" />

            <BottomMenu key="1" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import * as q from 'quasar';
import { QLayout, QFooter, QToolbar, QBtn } from 'quasar';
import { fasBatteryFull, fasSignal, fasWifi } from '@quasar/extras/fontawesome-v6';
import TopBar from './components/TopBar.vue';
import Apps from './components/Apps.vue';
import BottomMenu from './components/BottomMenu.vue';

export default defineComponent({
    name: 'Phone',
    components: {
        TopBar,
        Apps,
        BottomMenu,
        QLayout,
        QFooter,
        QToolbar,
        QBtn,
    },
    props: {
        width: {
            type: Number,
            default: 16, // Prozentwert
        },
        height: {
            type: Number,
            default: 60, // Prozentwert
        },
        isDynamic: {
            type: Boolean,
            default: false,
        },
        netz: {
            type: String,
            default: 'Hamudi Tel', // Standardmäßig Hamudi Tel
        },
        position: {
            type: String,
            default: 'bottom-right', // Standardposition
        },
        frameImageUrl: {
            type: String,
            default: './images/frame-default.jpg', // Standardmäßig kein Bild
        },
        signal: {
            type: Number,
            default: 5,
        },
        battery: {
            type: Number,
            default: 50,
        },
        wifi: {
            type: Boolean,
            default: true,
        },
        connectionTyp: {
            type: String,
            default: '5G',
        },
    },
    setup(props) {
        const frameStyle = computed(() => ({
            width: `${props.width}%`,
            height: `${props.height}%`,
        }));

        const positionStyle = computed(() => {
            switch (props.position) {
                case 'top-left':
                    return { top: '0', left: '0', position: 'fixed' };
                case 'top-right':
                    return { top: '0', right: '0', position: 'fixed' };
                case 'bottom-left':
                    return { bottom: '0', left: '0', position: 'fixed' };
                case 'bottom-right':
                default:
                    return { bottom: '0', right: '0', position: 'fixed' };
            }
        });

        const backgroundImageStyle = computed(() => {
            return props.frameImageUrl
                ? {
                      backgroundImage: `url(${props.frameImageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                  }
                : {};
        });

        // get status
        console.log('DarkMode: ' + q.Dark.isActive); // true, false

        // get configured status
        console.log(q.Dark.mode); // "auto", true, false

        // set status
        q.Dark.set(true); // or false or "auto"

        // toggle
        q.Dark.toggle();
        return {
            frameStyle,
            positionStyle,
            backgroundImageStyle,
            fasBatteryFull,
            fasSignal,
            fasWifi,
            TopBar,
            Apps,
            BottomMenu,
        };
    },
});
</script>

<style scoped>
.phone-frame {
    border: 6px solid black;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    max-width: 400px; /* Maximale Breite */
    max-height: 800px; /* Maximale Höhe */
}

.phone-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

@media (max-width: 800px) {
    .phone-frame {
        max-width: 300px;
        max-height: 600px;
    }
}

@media (max-width: 400px) {
    .phone-frame {
        max-width: 200px;
        max-height: 400px;
    }
}
</style>
