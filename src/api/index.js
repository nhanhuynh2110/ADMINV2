import Account from './account'
import Banner from './banner'
import Category from './category'
import Partner from './partner'
import Video from './video'
import File from './file'

export default () => {
  return {
    account: new Account(),
    banner: new Banner(),
    category: new Category(),
    partner: new Partner(),
    video: new Video(),
    file: new File()
  }
}
