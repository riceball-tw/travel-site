<template>
  <div class="container">
    <h1 class="favorite-banner">Favorite Attractions</h1>

    <!-- Pagination -->
    <ClientOnly>
      <div v-if="paginatedAttractions.length" class="pagination">
        <button :disabled="isPreviousAttractionReachEnd" class="pagination-button" type="button" @click="() => { currentAttractionPage = currentAttractionPage - 1 }">Previous Page</button>
        <span class="pagination-number">{{ currentAttractionPage }} / {{ numberOfAttractionPages }}</span>
        <button :disabled="isNextAttractionReachEnd" class="pagination-button" type="button" @click="() => { currentAttractionPage = currentAttractionPage + 1}">Next Page</button>
      </div>
      <template #fallback>
        Pagination is loading...
      </template>
    </ClientOnly>
        
    <ClientOnly>
      <ul v-if="paginatedAttractions.length" class="attraction-group">
        <template v-for="attraction in paginatedAttractions" :key="attraction.id">
          <Attraction :attraction="attraction" :is-editable="true" />
        </template>
      </ul>
      <p v-else>
        Favorite attraction is empty
      </p>
      <template #fallback>
        Favorite attraction is loading...
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
  const favoriteAttractionStore = useFavoriteAttractionStore()
  const { favoriteAttractions } = storeToRefs(favoriteAttractionStore)
  const currentAttractionPage = ref(1)
  const { paginatedArray: paginatedAttractions, numberOfPages: numberOfAttractionPages, isPreviousPageReachEnd: isPreviousAttractionReachEnd, isNextPageReachEnd: isNextAttractionReachEnd} = 
  usePagination({
    arrayToPaginate: favoriteAttractions,
    currentPage: currentAttractionPage
  })
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
