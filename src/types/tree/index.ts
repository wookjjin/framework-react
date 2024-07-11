export interface TreeSectionProps {
  id: string
  index: number
  label: string
  href: string
  children?: TreeSectionProps[]
  parentId?: string
}
