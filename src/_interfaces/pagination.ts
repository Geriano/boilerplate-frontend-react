export interface Paginator {
  page: number
  limit: number
  search: string
  order: {
    dir: 'asc'|'desc'
    key: string
  }
}

export interface Paginated<T> {
  meta: {
    total: number
    per_page: number
    current_page: number
    last_page: number
    first_page: number
    first_page_url: string
    last_page_url: string
    next_page_url: string|null
    previous_page_url: string|null
  }
  data: T[]
}