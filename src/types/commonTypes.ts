export type Login = {
  username: number
  password: string
}

export type Domain = {
  documentId: string
  domain_name: string
  domain_desc: string
  publishedAt: Date
  createdAt: Date
  value?: string
  label?: string
  data?: unknown[]
}

export type Categories = {
  document_id?: string | undefined
  category_name?: string | undefined
  category_desc?: string | undefined
  category_slug?: string | undefined
  createdAt?: Date | undefined
  updatedAt?: Date | undefined
  domains?: unknown[] | undefined
}

export type CategoriesData = {
  data?: object
  document_id?: string
  category_name?: string
  category_desc?: string
  category_slug?: string
  createdAt?: Date
  updatedAt?: Date
  domains?: unknown[] | undefined
}

export type Tags = {
  tag_name?: string
  tag_slug?: string
  category?: []
  createdAt?: Date | undefined
  updatedAt?: Date | undefined
}
