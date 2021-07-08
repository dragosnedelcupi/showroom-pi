export type ICategory = typeof Category[keyof typeof Category]

export const Category = {
  HOME: 'home',
  WORK: 'work',
  OTHERS: 'others',
  ALL: 'all',
} as const
