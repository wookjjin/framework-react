import { getUniqueId } from '~/composables/utils'

export const menuData = [
  {
    id: getUniqueId(),
    index: 1,
    label: 'Home',
    href: '/home',
    children: undefined,
    parentId: undefined
  },
  {
    id: getUniqueId(),
    index: 2,
    label: 'About',
    href: '/about',
    children: undefined,
    parentId: undefined
  },
  {
    id: getUniqueId(),
    index: 3,
    label: 'Example',
    href: '/example',
    children: undefined,
    parentId: undefined
  },
]
