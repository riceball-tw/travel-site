<template>
  <div class="container">
    <h1 class="favorite-banner">Favorite Attractions</h1>

    <div v-for="attraction in favoriteAttractions" :key="attraction.id">
      <button @click="() => toggleFavoriteAttraction(attraction)" type="button">
        <span v-if="isTargetAttractionExist(favoriteAttractions, attraction.id)">✅</span>
        <span v-else>😑</span>
      </button>
      {{ attraction.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
  const favoriteAttractionStore = useFavoriteAttractionStore()
  const { favoriteAttractions } = storeToRefs(favoriteAttractionStore)
  const { toggleFavoriteAttraction, isTargetAttractionExist } = favoriteAttractionStore

</script>

<style lang="scss">
  .favorite-banner {
    text-align: center;
    font-weight: bold;
    font-size: 3rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
</style>
