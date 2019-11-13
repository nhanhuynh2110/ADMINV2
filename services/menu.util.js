// let { hasPermission } = require('./permissions.util')

const hasPermission = (role = [], key) => role.find(el => el.key === key)

let init = (permissions) => {
  let menu = [
    {
      key: 'account',
      title: 'Account',
      childItem: [
        { text: 'New', link: '/account/add', permission: true },
        { text: 'List', link: '/account', permission: true }
      ],
      icon: 'fa fa-book',
      permission: true
    },
    {
      key: 'slide',
      title: 'Slide',
      childItem: [
        { text: 'New', link: '/slide/add', permission: true },
        { text: 'List', link: '/slide', permission: true }
      ],
      icon: 'fa fa-book',
      permission: true
    },
    {
      key: 'category',
      title: 'Category',
      childItem: [
        { text: 'New', link: '/category/add', permission: true },
        { text: 'List', link: '/category', permission: true }
      ],
      icon: 'fa fa-book',
      permission: true
    },
    {
      key: 'category-post',
      title: 'Category Post',
      childItem: [
        { text: 'New', link: '/category-post/add', permission: true },
        { text: 'List', link: '/category-post', permission: true }
      ],
      icon: 'fa fa-book',
      permission: true
    },
    {
      key: 'product',
      title: 'Product',
      childItem: [
        { text: 'New', link: '/product/add', permission: true },
        { text: 'List', link: '/product', permission: true }
      ],
      icon: 'fa fa-book',
      permission: true
    },
    {
      key: 'producer',
      title: 'Producer',
      childItem: [
        { text: 'New', link: '/producer/add', permission: true },
        { text: 'List', link: '/producer', permission: true }
      ],
      icon: 'fa fa-book',
      permission: true
    },
    {
      key: 'advertise',
      title: 'Advertise',
      childItem: [
        { text: 'New', link: '/advertise/add', permission: true },
        { text: 'List', link: '/advertise', permission: true }
      ],
      icon: 'fa fa-book',
      permission: true
    },
    {
      key: 'post',
      title: 'Post',
      childItem: [
        { text: 'New', link: '/post/add', permission: true },
        { text: 'List', link: '/post', permission: true }
      ],
      icon: 'fa fa-book',
      permission: true
    },
    {
      key: 'gallery',
      title: 'Gallery',
      childItem: [
        { text: 'Manage', link: '/gallery', permission: true }
      ],
      icon: 'fa fa-book',
      permission: true
    },
    {
      key: 'contact',
      title: 'Contact',
      childItem: [
        { text: 'Contact Info', link: '/contact-info', permission: true },
        { text: 'List', link: '/contact', permission: true }
      ],
      icon: 'fa fa-book',
      permission: true
    },
  ]
  let menuData = []
  menu.forEach((el) => {
    if (el.permission) {
      let child = []
      if (el.childItem && el.childItem.length) {
        el.childItem.forEach(c => {
          if (c.permission) child.push(c)
        })
      }
      el.childItem = child
      menuData.push(el)
    }
  })
  return menuData
}

module.exports = (permissions) => init(permissions)
