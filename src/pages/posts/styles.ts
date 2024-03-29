import styled from 'styled-components'

export const PostMain = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem;
`

export const PostContent = styled.div`
  max-width: 720px;
  margin: 5rem auto 0;
`

export const PostLink = styled.a`
  display: block;

  & + a {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--gray-700);
  }

  strong {
    display: block;
    font-size: 1.5rem;
    margin-top: 1rem;
    line-height: 2rem;
    transition: color 0.2s;
  }

  p {
    color: var(--gray-300);
    margin-top: 0.5rem;
    line-height: 1.625rem;
  }

  &:hover strong {
    color: var(--yellow-500);
  }
`

export const PostCreatedAt = styled.time`
  font-size: 1rem;
  display: flex;
  align-items: center;
  color: var(--gray-300);
`

export default { PostContent, PostCreatedAt, PostLink, PostMain }
