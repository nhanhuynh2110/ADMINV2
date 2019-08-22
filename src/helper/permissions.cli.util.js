let hasPermissions = (permissions, currentUser, type) => {
  let isPermissions = false
  if (!permissions) return false
  if (!currentUser) return false
  Object.keys(permissions).forEach(key => {
    permissions[key].forEach(el => {
      if (el.includes(type) && currentUser.includes(type)) {
        isPermissions = true
      }
    })
  })

  return isPermissions
}

let routerPermissions = (type, permissions, permissionsUser) => {
  if (!type) return false
  return hasPermissions(permissions, permissionsUser, type)
}

exports.hasPermissions = hasPermissions
exports.routerPermissions = routerPermissions
