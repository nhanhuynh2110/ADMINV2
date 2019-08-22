import categoryListener from './category'
export default (getCtr) => {
  return {
    setupAPIListeners: () => {
      categoryListener(getCtr)
    }
  }
}
