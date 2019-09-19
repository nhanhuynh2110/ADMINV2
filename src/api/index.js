import Account from './account'
import Banner from './banner'
import Category from './category'
import CategoryPost from './categoryPost'
import Post from './post'
import Partner from './partner'
import Video from './video'
import File from './file'
import Gallery from './gallery'
import Role from './roles'
import Product from './product'
import Permission from './permission'

export default () => {
  return {
    account: new Account(),
    banner: new Banner(),
    category: new Category(),
    categoryPost: new CategoryPost(),
    post: new Post(),
    partner: new Partner(),
    video: new Video(),
    file: new File(),
    gallery: new Gallery(),
    role: new Role(),
    product: new Product(),
    permission: new Permission()
  }
}
