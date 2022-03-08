import { ActiveLink } from '../ActiveLink'
import { SignInButton } from '../SignInButton'
import * as S from './styles'

export const Header = () => {
  return (
    <S.Container>
      <S.Content>
        <S.Logo src="/images/logo.svg" alt="ig.news" />
        <S.Nav>
          <ActiveLink activeClassName="active" href="/">
            <S.Link>Home</S.Link>
          </ActiveLink>

          <ActiveLink activeClassName="active" href="/posts">
            <S.Link>Posts</S.Link>
          </ActiveLink>
        </S.Nav>
        <SignInButton />
      </S.Content>
    </S.Container>
  )
}
