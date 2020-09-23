export default interface ILocation {
  id?: number
  // userId?: number
  name?: string
  photo?: any
  description?: string,
  occasion?: string,
  phone?: number
  street?: string
  city?: string
  food?: string,
  price?: string
}

export default interface IModal {
  modal: boolean
}