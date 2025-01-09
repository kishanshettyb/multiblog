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
  value?: string | undefined
  label?: string | undefined
  data?: unknown[] | undefined
  domains?: object
}

export type Categories = {
  documentId?: string | undefined
  category_name?: string | undefined
  category_desc?: string | undefined
  category_slug?: string | undefined
  createdAt?: Date
  updatedAt?: Date
  value?: string | undefined
  label?: string | undefined
  domains?: unknown[]
}

export type Tags = {
  tag_name?: string
  tag_slug?: string
  category?: []
  createdAt: Date
  updatedAt?: string
  value?: string | undefined
  label?: string | undefined
  documentId?: string
}
