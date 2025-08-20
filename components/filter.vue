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
      <button
        :class="{ active: store.filters.rooms[0] === 1 && store.filters.rooms[1] === 1 }"
        @click="setRooms(1, 1)"
      >
        1
      </button>
      <button
        :class="{ active: store.filters.rooms[0] === 2 && store.filters.rooms[1] === 2 }"
        @click="setRooms(2, 2)"
      >
        2
      </button>
      <button
        :class="{ active: store.filters.rooms[0] === 3 && store.filters.rooms[1] === 3 }"
        @click="setRooms(3, 3)"
      >
        3
      </button>
      <button
        :class="{ active: store.filters.rooms[0] === 4 && store.filters.rooms[1] === 4 }"
        @click="setRooms(4, 4)"
      >
        4
      </button>
      <button
        :class="{ active: store.filters.rooms[0] === 1 && store.filters.rooms[1] === 4 }"
        @click="setRooms(1, 4)"
      >
        Все
      </button>
    </div>
    <div class="filter-section">
      <p>Стоимость квартиры, ₽</p>
      <label>Цена: {{ store.filters.price[0] }} - {{ store.filters.price[1] }}</label>
      <div ref="priceSlider"></div>
    </div>

    <div class="filter-section">
      <p>Этаж</p>
      <label>Этаж: {{ store.filters.floor[0] }} - {{ store.filters.floor[1] }}</label>
      <div ref="floorSlider"></div>
    </div>

    <div class="filter-section">
      <p>Площадь, м²</p>
      <label>Площадь: {{ store.filters.square[0] }} - {{ store.filters.square[1] }}</label>
      <div ref="squareSlider"></div>
    </div>

    <button class="reset-btn" @click="resetFilters">Сбросить параметры</button>
  </div>
</template>

<style scoped lang="scss">

.reset-btn {
  margin-top: 20px;
  padding: 8px 12px;
  background: transparent;
  color: #000000;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    background: #3eb57c;
    color: #fff;
  }
  &:active {
    transform: scale(0.95);
  }
}
.rooms-buttons {
  display: flex;
  gap: 10px;
  margin-top: 8px;
  justify-content: center;

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
      background: #c5c5c5;
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

.filter-panel {
  display: flex;
  flex-direction: column;
  padding: 20px;

  .filter-section {
    display: flex;
    flex-direction: column;
  }
}


.filter {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filter-item label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 9999px;
  background: #ddd;
  outline: none;
  margin-bottom: 10px;
}

/* Webkit (Chrome, Safari, Edge) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #c0392b;
  cursor: pointer;
  margin-top: -6px; /* центрирует по треку */
}

/* Firefox */
.slider::-moz-range-thumb {
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #c0392b;
  cursor: pointer;
}

/* Активная часть для Webkit */
.slider::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 9999px;
  background: linear-gradient(to right, #c0392b 0%, #c0392b 50%, #ddd 50%, #ddd 100%);
}

/* Активная часть для Firefox */
.slider::-moz-range-track {
  height: 6px;
  border-radius: 9999px;
  background: linear-gradient(to right, #c0392b 0%, #c0392b 50%, #ddd 50%, #ddd 100%);
}
</style>
