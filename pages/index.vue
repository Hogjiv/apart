<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useStore } from "~/store/store"
import apartmentsRow from "~/components/apartmentsRow.vue"
import buttonTop from "~/components/buttonTop.vue"
import Filter from "~/components/filter.vue"
import ArrowUp from "~/assets/icons/arrow-up.svg"
import ArrowDown from "@/assets/icons/arrow-down.svg"

const store = useStore()
const showMobileFilters = ref(false)
const windowWidth = ref(0)


function handleResize() {
  windowWidth.value = window.innerWidth
}

function applyFilters() {
  showMobileFilters.value = false
}

onMounted(async () => {
  await store.fetchApartments()
  windowWidth.value = window.innerWidth
  window.addEventListener("resize", handleResize)
})

onUnmounted(() => {
  window.removeEventListener("resize", handleResize)
})
</script>

<template>
  <div class="wrap">
    <h1 class="page-title">Квартиры</h1>

    <button class="mobile-filter-btn" @click="showMobileFilters = !showMobileFilters">
      {{ showMobileFilters ? 'Закрыть фильтры' : 'Фильтры' }}
    </button>

    <main class="parametric">
      <section class="apartment-table">
        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th class="col-plan">
                  <span class="sort-label">Планировка</span>
                </th>
                <th class="col-name">
                  <span class="sort-label">
                    Квартира
                    <span class="sort-icons">
                      <ArrowUp class="icon" />
                      <ArrowDown class="icon" />
                    </span>
                  </span>
                </th>
                <th class="col-area">
                  <span class="sort-label">
                    Площадь
                    <span class="sort-icons">
                      <ArrowUp class="icon" />
                      <ArrowDown class="icon" />
                    </span>
                  </span>
                </th>
                <th class="col-floor">
                  <span class="sort-label">
                    Этаж
                    <span class="sort-icons">
                      <ArrowUp class="icon" />
                      <ArrowDown class="icon" />
                    </span>
                  </span>
                </th>
                <th class="col-price">
                  <span class="sort-label">
                    Цена
                    <span class="sort-icons">
                      <ArrowUp class="icon" />
                      <ArrowDown class="icon" />
                    </span>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-if="store.loading">
                <td colspan="5" class="loading-cell">Подождите...</td>
              </tr>
              <tr v-else-if="!store.visibleApartments.length">
                <td colspan="5" class="empty-cell">Нет подходящих квартир</td>
              </tr>

              <apartmentsRow v-for="apt in store.visibleApartments" :key="apt.name" :apartment="apt" />

            </tbody>
          </table>

          <div v-if="store.visibleApartments.length < store.filteredApartments.length" class="show-more">
            <button @click="store.showMore">Показать ещё</button>
          </div>
        </div>

      </section>

      <section class="parametric-filters" :class="{ 'mobile-open': showMobileFilters && windowWidth <= 670 }"
        v-show="showMobileFilters || windowWidth > 670">
        <Filter />
        <button v-if="windowWidth <= 670" class="show-filters-btn" @click="applyFilters">
          Применить
        </button>
      </section>

    </main>

    <buttonTop />
  </div>
</template>

<style scoped lang="scss">
.show-more {
  text-align: center;
}

.show-more button {

  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background: #3EB57C;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  transition: 0.3s;
  outline: none;
  border: none;
  width: 150px;
  height: 40px;
  font-size: 16px;
  ;

  &:hover {
    background: #aaaaaa;
    color: #fff;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {

    outline: none;
  }

}


.show-more button:hover {
  background: #aaaaaa;
  z-index: 99999;
}


.parametric-filters.mobile-open {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: #e0f2e4;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

.show-filters-btn {
  margin-top: 15px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  background: #3eb57c;
  color: #fff;
  cursor: pointer;
  width: 100%;
  transition: 0.2s;

  &:hover {
    background: #aaaaaa;
    background-color: #b8860b;
  }

  &:active {
    transform: scale(0.95);
  }
}

.wrap {
  border-radius: 15px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 10px;
}

.page-title {
  text-align: start;
  margin-bottom: 20px;
  color: #000;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
}

.mobile-filter-btn {
  display: none;
  margin-bottom: 10px;
  padding: 10px 15px;
  background-color: #3eb57c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
  font-size: clamp(14px, 3vw, 16px);

  &:hover {
    background: #aaaaaa;
  }

  &:active {
    transform: scale(0.95);
  }
}

.parametric {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  gap: 20px;
}

.apartment-table {
  flex: 1;
  box-sizing: border-box;

  .table-wrapper {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;

    .col-plan {
      width: 18%;
      min-width: 80px;
    }

    .col-name {
      width: 30%;
      min-width: 120px;
    }

    .col-area {
      width: 15%;
      min-width: 70px;
    }

    .col-floor {
      width: 12%;
      min-width: 60px;
    }

    .col-price {
      width: 25%;
      min-width: 100px;
    }
  }

  th,
  td {
    padding: 12px 8px;
    text-align: left;
    vertical-align: middle;
    border-bottom: 1px solid #646464;
    font-size: clamp(12px, 2vw, 16px);
  }

  thead th {
    cursor: pointer;
    background-color: #f8f9fa;
    font-weight: 600;
    position: sticky;
    top: 0;
  }

  .sort-label {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
    font-size: clamp(11px, 2vw, 16px);
  }

  .sort-icons {
    display: inline-flex;
    flex-direction: column;
    margin-left: 2px;
  }

  .icon {
    width: clamp(8px, 2vw, 10px);
    height: clamp(8px, 2vw, 10px);
    fill: #999;
  }

  th:hover {
    background-color: #b8860b;
    color: white;
  }

  .show-more-row,
  .loading-cell,
  .empty-cell {
    text-align: center;
    padding: 20px;
    font-size: clamp(14px, 3vw, 16px);
  }

  .show-more-btn {
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    background: #3eb57c;
    color: #fff;
    cursor: pointer;
    transition: 0.2s;
    font-size: clamp(12px, 2.5vw, 14px);

    &:hover {
      background: #349966;
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

.parametric-filters {
  flex: 0 0 400px;
  height: 400px;
  background-color: #e0f2e4;
  padding: 30px;
  border-radius: 8px;

  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}

@media (max-width: 1100px) {
  .parametric-filters {
    flex: 0 0 350px;
    height: 400px;
  }

  .apartment-table .table {
    .col-plan {
      width: 16%;
      min-width: 70px;
    }

    .col-name {
      width: 32%;
      min-width: 100px;
    }

    .col-area {
      width: 14%;
      min-width: 60px;
    }

    .col-floor {
      width: 12%;
      min-width: 50px;
    }

    .col-price {
      width: 26%;
      min-width: 90px;
    }
  }

  .apartment-table th,
  .apartment-table td {
    padding: 10px 6px;
    font-size: clamp(11px, 2vw, 14px);
  }
}

@media (max-width: 960px) {
  .parametric-filters {
    flex: 0 0 300px;
    height: 400px;
  }

  .apartment-table .table {
    .col-plan {
      width: 15%;
      min-width: 65px;
    }

    .col-name {
      width: 33%;
      min-width: 90px;
    }

    .col-area {
      width: 16%;
      min-width: 55px;
    }

    .col-floor {
      width: 12%;
      min-width: 45px;
    }

    .col-price {
      width: 24%;
      min-width: 85px;
    }
  }
}

@media (max-width: 800px) {
  .parametric-filters {
    flex: 0 0 250px;
    height: 400px;
  }

  .apartment-table .table {
    .col-plan {
      width: 14%;
      min-width: 60px;
    }

    .col-name {
      width: 34%;
      min-width: 80px;
    }

    .col-area {
      width: 16%;
      min-width: 50px;
    }

    .col-floor {
      width: 12%;
      min-width: 40px;
    }

    .col-price {
      width: 24%;
      min-width: 80px;
    }
  }

  .apartment-table th,
  .apartment-table td {
    padding: 8px 4px;
    font-size: clamp(10px, 2.2vw, 13px);
  }
}

@media (max-width: 670px) {
  .parametric {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }

  .apartment-table {
    width: 100%;
    max-width: 100%;

    .table {
      .col-plan {
        width: 20%;
      }

      .col-name {
        width: 30%;
      }

      .col-area {
        width: 18%;
      }

      .col-floor {
        width: 12%;
      }

      .col-price {
        width: 20%;
      }
    }

    th,
    td {
      padding: 8px 3px;
      font-size: clamp(9px, 3vw, 12px);
    }

    .sort-label {
      font-size: clamp(8px, 3vw, 11px);
      gap: 1px;
    }
  }



  .mobile-filter-btn {
    display: block;
    width: 100%;
  }

  .page-title {
    text-align: center;
    margin-bottom: 15px;
  }
}

@media (max-width: 400px) {
  .wrap {
    padding: 5px;
  }

  .apartment-table .table {
    .col-plan {
      width: 18%;
    }

    .col-name {
      width: 28%;
    }

    .col-area {
      width: 18%;
    }

    .col-floor {
      width: 14%;
    }

    .col-price {
      width: 22%;
    }
  }

  .apartment-table th,
  .apartment-table td {
    padding: 6px 2px;
    font-size: clamp(8px, 3.5vw, 10px);
  }
}
</style>