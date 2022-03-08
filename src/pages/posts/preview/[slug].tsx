import { GetStaticPaths, GetStaticProps } from 'next'
import { getPrismicClient } from '../../../services/prismic'

import { RichText } from 'prismic-dom'
import Head from 'next/head'

import * as S from '../slug.styles'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface PostPreviewProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

const PostPreview = ({ post }: PostPreviewProps) => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])
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
            isActive={true}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <S.SlugContinueReading>
            Wanna continue reading?
            <Link href="/">
              <S.SlugSubscribeLink>Subscribe Now 🤗</S.SlugSubscribeLink>
            </Link>
          </S.SlugContinueReading>
        </S.SlugArticle>
      </S.SlugMain>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const prismic = getPrismicClient()

  const response = await prismic.getByUID<any>('publication', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
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
    },
    redirect: 60 * 30 // 30 minutes
  }
}

export default PostPreview
