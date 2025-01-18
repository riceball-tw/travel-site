<template>
  <div class="container">
    <h1 class="favorite-banner">Favorite Attractions</h1>

    <ul class="attraction-group">
      <template v-for="attraction in favoriteAttractions" :key="attraction.id">
        <Attraction :attraction="attraction" />
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
  const favoriteAttractionStore = useFavoriteAttractionStore()
  const { favoriteAttractions } = storeToRefs(favoriteAttractionStore)
</script>

<style lang="scss" scoped>
  .favorite-banner {
    text-align: center;
    font-weight: bold;
    font-size: 3rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .attraction-group {
    --minWidthAttraction: 300px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--minWidthAttraction),1fr));
    gap: 1rem;
  }
</style>
