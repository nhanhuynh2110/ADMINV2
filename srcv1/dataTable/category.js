export default {
  _id: {
    label: 'ID',
    hidden: true
  },
  title: {
    label: 'Title',
    required: true
  },
  parentId: {
    label: 'Parent',
    formatter: (v) => !v ? 'Parent' : 'Childen'
  }
  
  // dob: {
  //   label: 'Born in',
  //   formatter: (v, locale) => {
  //     var rtf1 = new Intl.RelativeTimeFormat(locale);
  //     const today = new Date().getTime();
  //     const relativeDays = Math.ceil(
  //       (v.getTime() - today) / (1000 * 3600 * 24 * 365)
  //     );
  //     return rtf1.format(relativeDays, 'year');
  //   }
  // },
  // income: {
  //   label: 'Income',
  //   formatter: (v, locale) =>
  //     v.toLocaleString(locale, {
  //       style: 'currency',
  //       currency: 'USD'
  //     })
  // }
};
