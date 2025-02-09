<template>
  <div class="container">
    <!-- Banner -->
    <h1 class="attraction-banner">Attractions</h1>
    <div class="attraction-content">
      <!-- Category Select -->
      <select v-model="currentCategoryId" v-if="attractionCategoriesStatus === 'success'">
        <option :value="null">All</option>
        <option v-for="{id, name} in attractionCategories.data.Category" :key="id" :value="id">{{ name }}</option>
      </select>
      <div v-else>
        Attraction Category Select is Loading...
      </div>

      <!-- Pagination -->
      <ClientOnly>
        <div class="pagination">
          <button :disabled="isPreviousPageReachEnd" class="pagination-button" type="button" @click="() => { attractionsPageNumber = attractionsPageNumber - 1 }">Previous Page</button>
          <span class="pagination-number">{{ attractionsPageNumber }}</span>
          <button :disabled="isNextPageReachEnd" class="pagination-button" type="button" @click="() => { attractionsPageNumber = attractionsPageNumber + 1}">Next Page</button>
        </div>
        <template #fallback>
          Pagination is loading...
        </template>
      </ClientOnly>
      
      <!-- Attraction -->
      <ClientOnly>
        <ul class="attraction-group" v-if="attractionsStatus === 'success'">
          <template v-for="attraction in attractions!.data" :key="attraction.id">
            <Attraction :attraction="attraction" />
          </template>
        </ul>
        <div v-else>
          Attractions is Loading...
        </div>
        <template #fallback>
          <p class="attraction-loader">Attractions is Loading...</p>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { AttractionsResponse } from '@/types/attractions';
  import type { AttractionCategoriesType, AttractionCategory } from '@/types/attractionCategories'

  const locale = 'zh-tw'
  const currentCategoryId = defineModel<AttractionCategory['id'] | null>('currentCategory', { default: null })
  const attractionsPageNumber = ref(1)
  watch(currentCategoryId, () => { attractionsPageNumber.value = 1 })
  
  const { data: attractions, status: attractionsStatus } = useLazyFetch<AttractionsResponse>(`/api/travel-taipei/${locale}/Attractions/All`, {
    query: { page: attractionsPageNumber, categoryIds: currentCategoryId},
  })
  const {data: attractionCategories, status: attractionCategoriesStatus} = useLazyFetch(`/api/travel-taipei/${locale}/Miscellaneous/Categories`, {
    query: { type: 'Attractions' } as { type: AttractionCategoriesType }
  })

  const isNextPageReachEnd = computed(() => {
    const totalAttraction = attractions.value?.total || 0
    const maxAttractionPerPage = 30
    const nextPage = attractionsPageNumber.value + 1
    const lastPage = Math.ceil(totalAttraction / maxAttractionPerPage)
    return nextPage > lastPage
  })

  const isPreviousPageReachEnd = computed(() => {
    const previousPage = attractionsPageNumber.value - 1
    return previousPage < 1
    
  })
</script>

<style lang="scss" scoped>
  .attraction-banner {
    text-align: center;
    font-weight: bold;
    font-size: 3rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .attraction-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .attraction-group {
    --minWidthAttraction: 300px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--minWidthAttraction),1fr));
    gap: 1rem;
  }

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

  .attraction-loader {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .pagination {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .pagination-number {
    font-size: 2rem;
  }

  .pagination-button {
    padding: 1rem;
  }

</style>