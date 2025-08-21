import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface Apartment {
  name: string;
  floors: number;
  square: number;
  price: number;
  rooms: number;
  img: string;
}

export interface Filters {
  rooms: [number, number];
  price: [number, number];
  floor: [number, number];
  square: [number, number];
}

export const useStore = defineStore("apartments", () => {
  const apartments = ref<Apartment[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const filters = ref<Filters>({
    rooms: [1, 4],
    price: [4000000, 16000000],
    floor: [1, 15],
    square: [20, 200],
  });
  const filterLoading = ref(false);

  const visibleCount = ref(5);

  async function fetchApartments() {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch("/apartments.json");
      if (!res.ok) throw new Error(`Ошибка загрузки: ${res.status}`);
      const data: Apartment[] = await res.json();
      apartments.value = data;
    } catch (err: any) {
      error.value = err.message ?? "Неизвестная ошибка";
    } finally {
      loading.value = false;
    }
  }

  async function setFilters(newFilters: Filters) {
    filterLoading.value = true;
    filters.value = newFilters;
    await new Promise((resolve) => setTimeout(resolve, 700));
    filterLoading.value = false;
  }

  function resetFilters() {
    filters.value = {
      rooms: [1, 4],
      price: [4000000, 16000000],
      floor: [1, 15],
      square: [20, 200],
    };
    visibleCount.value = 20;
  }
  function showMore() {
    if (visibleCount.value < filteredApartments.value.length) {
      visibleCount.value = Math.min(
        visibleCount.value + 20,
        filteredApartments.value.length
      );
    }
  }
  function showMore() {
    visibleCount.value += 10;
  }

  const filteredApartments = computed(() => {
    const [minRooms, maxRooms] = filters.value.rooms;
    const [minPrice, maxPrice] = filters.value.price;
    const [minFloor, maxFloor] = filters.value.floor;
    const [minSquare, maxSquare] = filters.value.square;

    return apartments.value.filter(
      (apt) =>
        apt.rooms >= minRooms &&
        apt.rooms <= maxRooms &&
        apt.price >= minPrice &&
        apt.price <= maxPrice &&
        apt.floors >= minFloor &&
        apt.floors <= maxFloor &&
        apt.square >= minSquare &&
        apt.square <= maxSquare
    );
  });

  const visibleApartments = computed(() =>
    filteredApartments.value.slice(0, visibleCount.value)
  );

  return {
    apartments,
    loading,
    error,

    filters,
    filterLoading,
    setFilters,
    resetFilters,

    visibleCount,
    showMore,

    filteredApartments,
    visibleApartments,

    fetchApartments,
  };
});
