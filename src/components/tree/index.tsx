import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

import { TreeSectionProps } from '~/types/tree'

const TreeWrap = styled.ul`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  padding: 0 20px;

  gap: 1rem;

  list-style: none;
`

const StyledLink = styled(RouterLink)`
  color: #000;
  font-weight: 500;
  font-size: 1.2rem;

  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const TreeSection = (props: { treeProps: TreeSectionProps[], startDepth?: number }) => {
  let { treeProps, startDepth } = props
  startDepth = startDepth || 0

  return (
    <>
      {treeProps.length > 0 && (
        <>
          <TreeWrap>
            {treeProps.map((item) => (
              <li key={item.id}>
                <div>
                  <StyledLink key={item.id} to={item.href}>
                    {item.label}
                  </StyledLink>
                </div>
                {item.children && (
                  <TreeSection
                    treeProps={item.children}
                    startDepth={startDepth + 1}
                  />
                )}
              </li>
            ))}
          </TreeWrap>
        </>
      )}
    </>
  )
}

export default TreeSection
