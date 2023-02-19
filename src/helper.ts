import { Paginated, Paginator } from "./_interfaces/pagination"

export function createInitialPaginatorState(key: string): Paginator {
  return {
    page: 1,
    limit: 15,
    search: '',
    order: {
      dir: 'asc',
      key,
    },
  }
}

export function sanitizePaginatorQuery(paginator: Paginator) {
  return {
    page: paginator.page,
    limit: paginator.limit,
    search: paginator.search,
    'order[dir]': paginator.order.dir,
    'order[key]': paginator.order.key,
  }
}

export function createInitialPaginatedState<T>(): Paginated<T> {
  return {
    meta: {
      total: 1,
      per_page: 15,
      current_page: 1,
      last_page: 1,
      first_page: 1,
      first_page_url: '',
      last_page_url: '',
      next_page_url: null,
      previous_page_url: null,
    },
    data: [] as T[],
  }
}