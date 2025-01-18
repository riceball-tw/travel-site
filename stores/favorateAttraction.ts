import { defineStore } from 'pinia'
import type { Attraction } from '@/types/attractions'

export const useFavoriteAttractionStore = defineStore('favoriteAttraction', () => {
  const favoriteAttractions = ref<Attraction[]>([])

  function isTargetAttractionExist(attractions: Attraction[], targetId: number) {
    return attractions.some(favoriteAttraction => favoriteAttraction.id === targetId)
  }

  function toggleFavoriteAttraction(targetAttraction: Attraction) {
    const targetId = targetAttraction.id
    const isTargetIdExist = isTargetAttractionExist(favoriteAttractions.value, targetId)

    if (isTargetIdExist) {
      const attractionsWithoutTarget = favoriteAttractions.value.filter(attraction => attraction.id !== targetId)
      favoriteAttractions.value = attractionsWithoutTarget
    } else {
      const attractionsWithTarget = [...favoriteAttractions.value, targetAttraction] 
      favoriteAttractions.value = attractionsWithTarget
    }
  }

  function getEditedFavoriteAttractions(attractions: Attraction[], newAttraction: Attraction) {
    return attractions.map(attraction => {
      if (attraction.id === newAttraction.id) {
        return newAttraction
      }
      return attraction
    })
  }

  return { favoriteAttractions, toggleFavoriteAttraction, isTargetAttractionExist, getEditedFavoriteAttractions }
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  }
})