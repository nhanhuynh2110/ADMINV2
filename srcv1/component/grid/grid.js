const entries = [
  // { text: 1, value: 1 },
  { text: 10, value: 10 },
  { text: 20, value: 20 },
  { text: 30, value: 30 },
  { text: 40, value: 40 },
  { text: 50, value: 50 },
  { text: 100, value: 100 }
]
class GridAPI {
  constructor (payload) {
    this.payload = payload
    this.entries = entries
  }
}

export default GridAPI
