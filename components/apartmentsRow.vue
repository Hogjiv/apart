<script setup lang="ts">
import type { Apartment } from '../store/store'
import { defineProps } from 'vue'

const props = defineProps<{
  apartment: Apartment
}>()
</script>

<template>
  <tr class="apartment-row">
    <td class="plan-cell">
      <div class="img-container">
        <img :src="apartment.img" :alt="`Планировка ${apartment.name}`" class="plan-img" />
      </div>
    </td>
    <td class="name-cell">
      <span class="apartment-name">{{ apartment.name }}</span>
    </td>
    <td class="area-cell">
      <span class="area-value">{{ apartment.square }}&nbsp;м²</span>
    </td>
    <td class="floor-cell">
      <span class="floor-value">{{ apartment.floors }}</span>
    </td>
    <td class="price-cell">
      <span class="price-value">{{ apartment.price.toLocaleString() }}&nbsp;₽</span>
    </td>
  </tr>
</template>

<style scoped lang="scss">
.apartment-row {
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  td {
    vertical-align: middle;
    padding: 12px 8px;
  }
}

.plan-cell {
  text-align: center;
  
  .img-container {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 4px;
    background-color: #f8f9fa;
    margin: 4px 0;
  }
  
  .plan-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 4px;
  }
}

.name-cell {
  .apartment-name {
    font-weight: 500;
    color: #333;
    line-height: 1.4;
    word-break: break-word;
    display: block;
    padding: 4px 0;
    font-size: 16px; // Базовый размер для больших экранов
  }
}

.area-cell, .floor-cell, .price-cell {
  .area-value, .floor-value, .price-value {
    font-weight: 500;
    color: #444;
    display: block;
    padding: 4px 0;
    line-height: 1.3;
    font-size: 16px; // Единый размер для всех значений
  }
}

.price-cell {
  .price-value {
    color: #2c5530;
    font-weight: 600;
  }
}

// Средние экраны (планшеты)
@media (max-width: 960px) {
  .apartment-row td {
    padding: 14px 6px;
  }
  
  .plan-cell {
    .img-container {
      height: 90px;
      margin: 6px 0;
    }
  }
  
  // Единый размер шрифта 14px для всех элементов
  .name-cell .apartment-name {
    font-size: 14px;
    padding: 6px 0;
  }
  
  .area-value, .floor-value, .price-value {
    font-size: 14px;
    padding: 6px 0;
  }
}

// Мобильные экраны
@media (max-width: 480px) {
  .apartment-row td {
    padding: 16px 3px;
    vertical-align: top;
  }
  
  .plan-cell {
    .img-container {
      height: 100px;
      border-radius: 6px;
      margin: 8px 0;
    }
    
    .plan-img {
      border-radius: 6px;
    }
  }
  
  // Единый размер шрифта 12px для всех элементов
  .name-cell .apartment-name {
    font-size: 12px;
    line-height: 1.3;
    padding: 8px 0;
    font-weight: 600;
  }
  
  .area-value, .floor-value, .price-value {
    font-size: 12px;
    padding: 8px 0;
    font-weight: 500;
  }
  
  .price-value {
    font-weight: 700; // Цена остается жирнее, но того же размера
  }
}

// Очень маленькие экраны
@media (max-width: 360px) {
  .apartment-row td {
    padding: 14px 2px;
  }
  
  .plan-cell {
    .img-container {
      height: 80px;
      margin: 6px 0;
    }
  }
  
  // Единый размер шрифта 10px для всех элементов
  .name-cell .apartment-name {
    font-size: 10px;
    line-height: 1.2;
    padding: 6px 0;
  }
  
  .area-value, .floor-value, .price-value {
    font-size: 10px;
    padding: 6px 0;
  }
}</style>