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
