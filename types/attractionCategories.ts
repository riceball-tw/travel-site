// https://www.travel.taipei/open-api/swagger/ui/index#/Miscellaneous/Miscellaneous_Categories

export type AttractionCategoriesType = 'Activity' | 'Calendar' | 'Pictorial' | 'Attractions' | 'Gourmet' | 'Consume' | 'Accommodation' | 'Tours'

export type AttractionCategories = AttractionCategory[]

export type AttractionCategory = {
  id: number
  name: string
}
