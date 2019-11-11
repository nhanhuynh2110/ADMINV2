export default {
  name: {
    name: 'name',
    label: 'Name',
    validator: [
      { compare: 'require' }
    ]
  },
  email: {
    name: 'email',
    label: 'Email',
    validator: [
      { compare: 'require' }
    ]
  },
  fax: {
    name: 'fax',
    label: 'Fax'
  },
  address: {
    name: 'address',
    label: 'Address'
  },
  phone: {
    name: 'phone',
    label: 'Phone'
  },
  fb: {
    name: 'fb',
    label: 'Link Facecbook'
  },
  twitter: {
    name: 'twitter',
    label: 'Link twitter'
  },
  google: {
    name: 'google',
    label: 'Link google'
  },
  youtube: {
    name: 'youtube',
    label: 'Link youtube'
  },
  isActive: {
    name: 'isActive',
    text: 'Active'
  }
}
