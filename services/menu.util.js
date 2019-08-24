let { hasPermission } = require('./permissions.util')

let init = (permissions, permissionsUser) => {
  let hasPermissionMenu = (code) => {
    return hasPermission(permissions, permissionsUser, code)
  }
  let menu = [
    {
      key: 'category',
      title: 'Category',
      childItem: [
        { text: 'New', link: '/category/add', permission: hasPermissionMenu('CATEGORYADD') },
        { text: 'List', link: '/category', permission: hasPermissionMenu('CATEGORYVIEW') }
      ],
      icon: 'fa fa-book',
      permission: hasPermissionMenu('CATEGORYVIEW')
    },
    {
      key: 'category-post',
      title: 'Category POst',
      childItem: [
        { text: 'New', link: '/category-post/add', permission: true },
        { text: 'List', link: '/category-post', permission: true }
      ],
      icon: 'fa fa-book',
      permission: hasPermissionMenu('CATEGORYVIEW')
    },
    {
      key: 'blog',
      title: 'Blog',
      childItem: [
        { text: 'New', link: '/blog/form', permission: hasPermissionMenu('BLOGADD') },
        { text: 'List', link: '/blog', permission: hasPermissionMenu('BLOGVIEW') }
      ],
      icon: 'fa fa-book',
      permission: hasPermissionMenu('BLOGVIEW')
    },
    {
      key: 'advertise',
      title: 'Advertise',
      childItem: [
        { text: 'New', link: '/advertise/form', permission: hasPermissionMenu('ADVERTISEADD') },
        { text: 'List', link: '/advertise', permission: hasPermissionMenu('ADVERTISEVIEW') }
      ],
      icon: 'fa fa-book',
      permission: hasPermissionMenu('ADVERTISEVIEW')
    },
    {
      key: 'video',
      title: 'Video',
      childItem: [
        { text: 'New', link: '/video/form', permission: hasPermissionMenu('VIDEOADD') },
        { text: 'List', link: '/video', permission: hasPermissionMenu('VIDEOVIEW') }
      ],
      icon: 'fa fa-file-video-o',
      permission: hasPermissionMenu('VIDEOVIEW')
    },
    {
      key: 'partner',
      title: 'Partner',
      childItem: [
        { text: 'New', link: '/partner/form', permission: hasPermissionMenu('PARTNERADD') },
        { text: 'List', link: '/partner', permission: hasPermissionMenu('PARTNERVIEW') }
      ],
      icon: 'fa fa-group',
      permission: hasPermissionMenu('PARTNERVIEW')
    },
    {
      key: 'banner',
      title: 'Banner',
      childItem: [
        { text: 'New', link: '/banner/form', permission: hasPermissionMenu('BANNERADD') },
        { text: 'Banner', link: '/banner', permission: hasPermissionMenu('BANNERVIEW') }
      ],
      icon: 'fa fa-cc-discover',
      permission: hasPermissionMenu('BANNERVIEW')
    },
    {
      key: 'collection',
      title: 'Collection',
      childItem: [
        { text: 'New', link: '/collection/form', permission: hasPermissionMenu('COLLECTIONADD') },
        { text: 'QL Collection', link: '/collection', permission: hasPermissionMenu('COLLECTIONVIEW') }
      ],
      icon: 'fa fa-cc-discover',
      permission: hasPermissionMenu('COLLECTIONVIEW')
    },
    {
      key: 'homemanager',
      title: 'QL Wland',
      childItem: [{ text: 'New Layout Trang Chủ', link: '/home-manager', permission: hasPermissionMenu('HOMEMANAGERVIEW') },
        { text: 'Bài viết Trang Chủ', link: '/home/addBlogsHome', permission: hasPermissionMenu('HOMEMANAGERADDBLOG') },
        { text: 'QL Danh Mục Layout', link: '/category_layout', permission: hasPermissionMenu('CATEGORYLAYOUTVIEW') }],
      icon: 'fa fa-home',
      permission: hasPermissionMenu('HOMEMANAGERVIEW')
    },
    {
      key: 'user',
      title: 'QL Account',
      childItem: [{ text: 'New Account QL', link: '/account', permission: hasPermissionMenu('USERVIEW') },
        { text: 'Phân Quyền', link: '/group-permissions', permission: hasPermissionMenu('PERMISSIONSVIEW') }],
      icon: 'fa fa-users',
      permission: hasPermissionMenu('USERVIEW')
    },
    {
      key: 'more',
      title: 'Mở Rộng',
      childItem: [{ text: 'QL Header', link: '/header', permission: true }],
      icon: 'fa fa-cogs',
      permission: true
    }
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

module.exports = (permissions, permissionsUser) => {
  return init(permissions, permissionsUser)
}
