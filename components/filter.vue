```vue
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useStore } from "~/store/store"
import noUiSlider from "nouislider"
import "nouislider/dist/nouislider.css"

const store = useStore()

const priceSlider = ref<HTMLElement | null>(null)
const floorSlider = ref<HTMLElement | null>(null)
const squareSlider = ref<HTMLElement | null>(null)

onMounted(() => {
    // price
    if (priceSlider.value) {
        noUiSlider.create(priceSlider.value, {
            start: store.filters.price,
            connect: true,
            step: 100000,
            range: { min: 4000000, max: 16000000 },
            tooltips: true,
        })
        priceSlider.value.noUiSlider?.on("change", (v) => {
            store.setFilters({
                ...store.filters,
                price: v.map(Number) as [number, number],
            })
        })
    }

    // square
    if (squareSlider.value) {
        noUiSlider.create(squareSlider.value, {
            start: store.filters.square,
            connect: true,
            step: 1,
            range: { min: 20, max: 200 },
            tooltips: true,
        })
        squareSlider.value.noUiSlider?.on("change", (v) => {
            store.setFilters({
                ...store.filters,
                square: v.map(Number) as [number, number],
            })
        })
    }

    // floor
    if (floorSlider.value) {
        noUiSlider.create(floorSlider.value, {
            start: store.filters.floor,
            connect: true,
            step: 1,
            range: { min: 1, max: 15 },
            tooltips: true,
        })
        floorSlider.value.noUiSlider?.on("change", (v) => {
            store.setFilters({
                ...store.filters,
                floor: v.map(Number) as [number, number],
            })
        })
    }
})

function setRooms(min: number, max: number) {
    store.setFilters({
        ...store.filters,
        rooms: [min, max],
    })
}

function resetFilters() {
    store.resetFilters()
    priceSlider.value?.noUiSlider?.set(store.filters.price)
    floorSlider.value?.noUiSlider?.set(store.filters.floor)
    squareSlider.value?.noUiSlider?.set(store.filters.square)
}
</script>

<template>
    <div class="filter-panel filter" :class="{ disabled: store.filterLoading }">
        <div class="rooms-buttons filter-item">
            <button :class="{ active: store.filters.rooms[0] === 1 && store.filters.rooms[1] === 1 }"
                @click="setRooms(1, 1)">
                1
            </button>
            <button :class="{ active: store.filters.rooms[0] === 2 && store.filters.rooms[1] === 2 }"
                @click="setRooms(2, 2)">
                2
            </button>
            <button :class="{ active: store.filters.rooms[0] === 3 && store.filters.rooms[1] === 3 }"
                @click="setRooms(3, 3)">
                3
            </button>
            <button :class="{ active: store.filters.rooms[0] === 4 && store.filters.rooms[1] === 4 }"
                @click="setRooms(4, 4)">
                4
            </button>
            <button :class="{ active: store.filters.rooms[0] === 1 && store.filters.rooms[1] === 4 }"
                @click="setRooms(1, 4)">
                Все
            </button>
        </div>

        <div class="filter-section">
            <p>Стоимость квартиры, ₽</p>

            <div ref="priceSlider" class="slider"></div>
        </div>

        <div class="filter-section">
            <p>Этаж</p>

            <div ref="floorSlider" class="slider"></div>
        </div>

        <div class="filter-section">
            <p>Площадь, м²</p>

            <div ref="squareSlider" class="slider"></div>
        </div>

        <button class="reset-btn" @click="resetFilters">Сбросить параметры</button>
    </div>
</template>

<style scoped lang="scss">
.filter-panel {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;

}

.filter-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.rooms-buttons {
    display: flex;
    gap: 10px;
    margin-top: 8px;
    justify-content: center;
    flex-wrap: wrap;

    button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid #3eb57c;
        background: #fff;
        color: #000000;
        font-weight: bold;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
            background: #aaaaaa;
            color: #fff;
        }

        &:active {
            transform: scale(0.95);
        }

        &.active {
            background: #3eb57c;
            color: #fff;
        }
    }
}

.reset-btn {
    margin-top: 40px;
    padding: 8px 12px;
    background: transparent;
    color: #000000;
    cursor: pointer;
    font-weight: bold;
    transition: 0.2s;
    border-radius: 10px;
    height: 40px;


    &:hover {
        background: #aaaaaa;
        color: #fff;
    }

    &:active {
        transform: scale(0.95);
    }
}
</style>