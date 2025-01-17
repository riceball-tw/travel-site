<template>
  <div class="container">
    <!-- Banner -->
    <h1 class="attraction-banner">Attractions</h1>
    <div class="attraction-content">
      <!-- Pagination -->
      <div class="pagination">
        <button class="pagination-button" type="button" @click="() => handleChangeAttractionPageNumber(attractionsPageNumber - 1)">Previous Page</button>
        <span class="pagination-number">{{ attractionsPageNumber }}</span>
        <button class="pagination-button" type="button" @click="() => handleChangeAttractionPageNumber(attractionsPageNumber + 1)">Next Page</button>
      </div>
      <!-- Attraction -->
      <ul class="attraction-group" v-if="attractionsStatus === 'success'">
        <li class="attraction" v-for="({id, name, introduction}, index) in attractions!.data" :key="id">
          <h2 class="attraction-heading">{{ name }}</h2>
          <p class="attraction-introduction">{{ introduction }}</p>
        </li>
      </ul>
      <div class="attraction-loader" v-else>
        Attractions is Loading...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { AttractionsResponse } from '@/types/attractions';
  const attractionsPageNumber = ref(1)
  const locale = 'zh-tw'
  const { data: attractions, status: attractionsStatus } = useLazyFetch<AttractionsResponse>(`/api/travel-taipei/${locale}/Attractions/All`, {
    query: {page: attractionsPageNumber},
  })

  function handleChangeAttractionPageNumber(newPageNumber: number) {
    const isNewPageNumberNegative = newPageNumber < 1
    const isNewPageReachEnd = false // No idea which data represents page is reaching end, set fix value for now
    if (isNewPageNumberNegative || isNewPageReachEnd) return
    attractionsPageNumber.value = newPageNumber
  }
</script>

<style lang="scss">
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