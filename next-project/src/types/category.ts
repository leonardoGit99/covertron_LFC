export type Category = {
  id: number,
  name: string
  description: string
}

export type NewCategory = Omit<Category, 'id'>


export type Categories = Category[]