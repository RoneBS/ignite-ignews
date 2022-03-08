import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'

import * as S from './styles'

export const SignInButton = () => {
  const { data: session, status } = useSession()

  console.log(session, status)

  return session ? (
    <>
      <S.SignInButton type="button" onClick={() => signOut()}>
        <FaGithub color="#04d361" />
        {session.user.name}
        <FiX color="#737380" className="closeIcon" />
      </S.SignInButton>
    </>
  ) : (
    <S.SignInButton type="button" onClick={() => signIn('github')}>
      <FaGithub color="#eba417" />
      Sign in with GitHub
    </S.SignInButton>
  )
}
