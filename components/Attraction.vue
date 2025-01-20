<template>
  <li class="attraction">
    <button @click="() => toggleFavoriteAttraction(attraction)" type="button">
      <span v-if="isTargetAttractionExist(favoriteAttractions, attraction.id)">✅</span>
      <span v-else>😑</span>
    </button>
    <button v-if="isEditable" @click="isEditing = !isEditing">
      <template v-if="isEditing">Preview</template>
      <template v-else>Edit</template>
    </button>

    <div v-if="isEditing">
      <form @submit.prevent="handleUpdateAttraction">
        <input id="id" type="hidden" :value="attraction.id">
        <label for="name">Name</label>
        <input id="name" :value="attraction.name" required />
        <button type="submit">Update Attraction</button>
      </form>
    </div>
    <div v-else>
      <h2 class="attraction-heading">{{ attraction.name }}</h2>
      <p class="attraction-introduction">{{ attraction.introduction }}</p>
    </div>
  </li>
</template>

<script setup lang="ts">
  import type { Attraction } from '@/types/attractions';

  const favoriteAttractionStore = useFavoriteAttractionStore()
  const { favoriteAttractions } = storeToRefs(favoriteAttractionStore)
  const { toggleFavoriteAttraction, isTargetAttractionExist, getEditedFavoriteAttractions } = favoriteAttractionStore
  
  const { attraction, isEditable } = defineProps<{attraction: Attraction, isEditable?: boolean}>()
  const isEditing = ref(false) 

  // Why any? - DOM is uncertain so manually casting type here
  function handleUpdateAttraction(event: any) {
    // Notice: Data submitted from form will become string
    const newId = parseInt(event.target.id.value) as number
    const targetAttraction = favoriteAttractions.value.find(attraction => attraction.id === newId)
    if (!targetAttraction) return
    const editedPartialAttraction: Partial<Attraction> = {
      name: event.target.name.value
    }
    const updatedAttraction = {...targetAttraction, ...editedPartialAttraction}
    const newAttractions = getEditedFavoriteAttractions(favoriteAttractions.value, updatedAttraction)
    favoriteAttractions.value = newAttractions
    isEditing.value = !isEditing
  }
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