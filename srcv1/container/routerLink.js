import React from 'react'
import {
  Home,
  Category, CategoryForm
} from './index'
import STORELINK from './storeLink'
import Test from './category/test'

export default () => {
  return [
    // {key: 'test-page', path: '/test', exact: true, component: Test},
    {key: 'home-page', path: STORELINK.HOME, exact: true, component: Home},
    {key: 'category-page', path: STORELINK.CATEGORY.grid, exact: true, component: Category},
    {key: 'category-add', path: STORELINK.CATEGORY.add, exact: true, render: () => <CategoryForm isAdd />},
    {key: 'category-edit', path: STORELINK.CATEGORY.edit, render: () => <CategoryForm />}
  ]
}
