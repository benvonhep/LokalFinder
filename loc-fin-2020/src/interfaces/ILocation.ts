export default interface ILocation {
  id?: number
  userId?: number
  name?: string
  photo?: any
  description?: string
  openingTime?: string
  phone?: number
  street?: string
  city?: string
  country?: string
  food?: string
}

export default interface IModal {
  modal: boolean
}