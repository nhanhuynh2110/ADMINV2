export default {
  id: {
    label: 'ID',
    hidden: true
  },
  name: {
    label: 'Name'
  },
  dob: {
    label: 'Date of Birth',
    formatter: (v, locale) =>
      v.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
  },
  income: {
    label: 'Income',
    formatter: (v, locale) =>
      v.toLocaleString(locale, { style: 'currency', currency: 'USD' })
  }
}
