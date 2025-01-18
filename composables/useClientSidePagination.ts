interface PaginationConfig<T> {
  rowsPerPage?: Ref<number>;
  arrayToPaginate: Ref<T[]>;
  currentPage: Ref<number>;
}

export function usePagination<T>(config: PaginationConfig<T>) {
  const rowsPerPage = config.rowsPerPage || ref(5);

  const paginatedArray = computed(() =>
    config.arrayToPaginate.value.slice(
      (config.currentPage.value - 1) * rowsPerPage.value,
      config.currentPage.value * rowsPerPage.value
    )
  );

  const numberOfPages = computed(() =>
    Math.ceil((config.arrayToPaginate.value.length || 0) / rowsPerPage.value)
  );

  const isPreviousPageReachEnd = computed(() => {
    const previousPage = config.currentPage.value - 1
    return previousPage < 1 
  })

  const isNextPageReachEnd = computed(() => {
    const nextPage = config.currentPage.value + 1
    return nextPage > numberOfPages.value
  })

  // Update current page when max page is changing
  watch(numberOfPages, () => {
    if (config.currentPage.value > numberOfPages.value) {
      config.currentPage.value = numberOfPages.value
    }
  })

  return {
    paginatedArray,
    numberOfPages,
    isPreviousPageReachEnd,
    isNextPageReachEnd
  };
}