export default {
  name: {
    name: 'name',
    validator: [
      { compare: 'require' }
    ]
  },
  email: {
    name: 'email',
    label: 'email',
    validator: [
      { compare: 'require' }
    ]
  },
  phone: {
    name: 'phone',
    label: 'phone',
    placeholder: 'phone'
  },
  subject: {
    name: 'subject',
    label: 'subject'
  },
  message: {
    name: 'messgae',
    label: 'messgae'
  },
  contactInfo: {
    name: 'contactInfo',
    label: 'Contact Info'
  },
  isActive: {
    name: 'isActive',
    text: 'Active'
  },
}
