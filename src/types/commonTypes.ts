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
  data?: unknown[]
}

export type Categories = {
  documentId: string
  category_name: string
  category_desc: string
  category_slug: string
  createdAt: Date
  updatedAt: Date
  data?: unknown[]
}
