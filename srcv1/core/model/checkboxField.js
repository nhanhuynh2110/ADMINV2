import Field from './field'

export default class CheckboxField extends Field {
  extractFromEvent (e) {
    const {
      target: { value, checked }
    } = e
    this.setValue(checked ? value : null)
  }
}
