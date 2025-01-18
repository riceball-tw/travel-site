<template>
  <li class="attraction">
    <button @click="() => toggleFavoriteAttraction(attraction)" type="button">
      <span v-if="isTargetAttractionExist(favoriteAttractions, attraction.id)">✅</span>
      <span v-else>😑</span>
    </button>

    <h2 class="attraction-heading">{{ attraction.name }}</h2>
    <p class="attraction-introduction">{{ attraction.introduction }}</p>
  </li>
</template>

<script setup lang="ts">
  import type { Attraction } from '@/types/attractions';

  const favoriteAttractionStore = useFavoriteAttractionStore()
  const { favoriteAttractions } = storeToRefs(favoriteAttractionStore)
  const { toggleFavoriteAttraction, isTargetAttractionExist } = favoriteAttractionStore
  
  const { attraction } = defineProps<{attraction: Attraction}>()
</script>

<style lang="scss">
  .attraction {
    padding: 1rem;
    border: 1px solid black;
  }

  .attraction-heading {
    font-size: 1.5rem;
    font-weight: medium;
    margin-bottom: 1rem;
  }

  .attraction-introduction {
    line-height: 1.7;
  }
</style>