import { getSession } from 'next-auth/react'
import { getPrismicClient } from '../../services/prismic'
import { RichText } from 'prismic-dom'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

import * as S from './slug.styles'

interface PostProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

const Post = ({ post }: PostProps) => {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <S.SlugMain>
        <S.SlugArticle>
          <S.SlugTitle>{post.title}</S.SlugTitle>
          <S.SlugUpdatedAt>{post.updatedAt}</S.SlugUpdatedAt>
          <S.SlugPostContent
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </S.SlugArticle>
      </S.SlugMain>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params
}) => {
  const session = await getSession({ req })
  const { slug } = params

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const prismic = getPrismicClient(req)

  const response = await prismic.getByUID<any>('publication', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }
    )
  }

  return {
    props: {
      post
    }
  }
}

export default Post
