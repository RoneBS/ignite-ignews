import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic'
import Prismic from '@prismicio/client'
import Link from 'next/link'

import { RichText } from 'prismic-dom'

import * as S from './styles'

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

type PostsProps = {
  posts: Post[]
}

export const Posts = ({ posts }: PostsProps) => {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <S.PostMain>
        <S.PostContent>
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <S.PostLink>
                <S.PostCreatedAt>{post.updatedAt}</S.PostCreatedAt>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </S.PostLink>
            </Link>
          ))}
        </S.PostContent>
      </S.PostMain>
    </>
  )
}

export default Posts

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query<any>(
    [Prismic.predicates.at('document.type', 'publication')],
    {
      fetch: ['publication.title', 'publication.content'],
      pageSize: 100
    }
  )
  console.log(JSON.stringify(response, null, 2))

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find((content) => content.type === 'paragraph')
          ?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      )
    }
  })
  return {
    props: {
      posts
    }
  }
}
