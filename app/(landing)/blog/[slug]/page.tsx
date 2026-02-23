import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import ArticleReadTracker from "@/components/facebook/ArticleReadTracker"

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  
  const posts = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const post = posts.docs[0]
  
  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.title,
  }
}

// Author Icon SVG
const AuthorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="currentColor">
    <path d="M15 16.5H13.5V15C13.5 14.4033 13.2629 13.831 12.841 13.409C12.419 12.9871 11.8467 12.75 11.25 12.75H6.75C6.15326 12.75 5.58097 12.9871 5.15901 13.409C4.73705 13.831 4.5 14.4033 4.5 15V16.5H3V15C3 14.0054 3.39509 13.0516 4.09835 12.3484C4.80161 11.6451 5.75544 11.25 6.75 11.25H11.25C12.2446 11.25 13.1984 11.6451 13.9016 12.3484C14.6049 13.0516 15 14.0054 15 15V16.5ZM9 9.75C8.40905 9.75 7.82389 9.63361 7.27792 9.40746C6.73196 9.18131 6.23588 8.84984 5.81802 8.43198C5.40015 8.01412 5.06869 7.51804 4.84254 6.97208C4.6164 6.42611 4.5 5.84095 4.5 5.25C4.5 4.65905 4.6164 4.07389 4.84254 3.52793C5.06869 2.98196 5.40015 2.48588 5.81802 2.06802C6.23588 1.65016 6.73196 1.31869 7.27792 1.09254C7.82389 0.866396 8.40905 0.75 9 0.75C10.1935 0.75 11.3381 1.22411 12.182 2.06802C13.0259 2.91193 13.5 4.05653 13.5 5.25C13.5 6.44348 13.0259 7.58807 12.182 8.43198C11.3381 9.2759 10.1935 9.75 9 9.75ZM9 8.25C9.79565 8.25 10.5587 7.93393 11.1213 7.37132C11.6839 6.80871 12 6.04565 12 5.25C12 4.45435 11.6839 3.69129 11.1213 3.12868C10.5587 2.56607 9.79565 2.25 9 2.25C8.20435 2.25 7.44129 2.56607 6.87868 3.12868C6.31607 3.69129 6 4.45435 6 5.25C6 6.04565 6.31607 6.80871 6.87868 7.37132C7.44129 7.93393 8.20435 8.25 9 8.25Z" />
  </svg>
)

// Calendar Icon SVG
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="currentColor">
    <path d="M12.75 2.25H15.75C15.9489 2.25 16.1397 2.32902 16.2803 2.46967C16.421 2.61032 16.5 2.80109 16.5 3V15C16.5 15.1989 16.421 15.3897 16.2803 15.5303C16.1397 15.671 15.9489 15.75 15.75 15.75H2.25C2.05109 15.75 1.86032 15.671 1.71967 15.5303C1.57902 15.3897 1.5 15.1989 1.5 15V3C1.5 2.80109 1.57902 2.61032 1.71967 2.46967C1.86032 2.32902 2.05109 2.25 2.25 2.25H5.25V0.75H6.75V2.25H11.25V0.75H12.75V2.25ZM11.25 3.75H6.75V5.25H5.25V3.75H3V6.75H15V3.75H12.75V5.25H11.25V3.75ZM15 8.25H3V14.25H15V8.25Z" />
  </svg>
)

// Format date helper
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

// Rich Text Node Interface
interface RichTextNode {
  type: string
  text?: string
  format?: number
  tag?: number
  url?: string
  listType?: string
  children?: RichTextNode[]
}

interface RichTextContent {
  root?: {
    children?: RichTextNode[]
  }
}

// Render Rich Text Content
function RichTextContentRenderer({ content }: { content: RichTextContent }) {
  if (!content?.root?.children) return null

  const renderNode = (node: RichTextNode, index: number): React.ReactNode => {
    if (node.type === 'paragraph') {
      return (
        <p key={index} className="mb-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          {node.children?.map((child: RichTextNode, i: number) => renderNode(child, i))}
        </p>
      )
    }

    if (node.type === 'heading') {
      const level = node.tag || 2
      const className = "mt-10 mb-4 text-2xl font-bold text-slate-900 dark:text-white"
      const children = node.children?.map((child: RichTextNode, i: number) => renderNode(child, i))
      
      switch (level) {
        case 1: return <h1 key={index} className={className}>{children}</h1>
        case 2: return <h2 key={index} className={className}>{children}</h2>
        case 3: return <h3 key={index} className={className}>{children}</h3>
        case 4: return <h4 key={index} className={className}>{children}</h4>
        case 5: return <h5 key={index} className={className}>{children}</h5>
        case 6: return <h6 key={index} className={className}>{children}</h6>
        default: return <h2 key={index} className={className}>{children}</h2>
      }
    }

    if (node.type === 'list') {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <ListTag key={index} className={`mb-6 pl-6 ${node.listType === 'number' ? 'list-decimal' : 'list-disc'} text-lg text-slate-700 dark:text-slate-300`}>
          {node.children?.map((child: RichTextNode, i: number) => renderNode(child, i))}
        </ListTag>
      )
    }

    if (node.type === 'listitem') {
      return (
        <li key={index} className="mb-2">
          {node.children?.map((child: RichTextNode, i: number) => renderNode(child, i))}
        </li>
      )
    }

    if (node.type === 'quote') {
      return (
        <blockquote key={index} className="my-8 border-l-4 border-blue-500 pl-6 italic text-xl text-slate-600 dark:text-slate-400">
          {node.children?.map((child: RichTextNode, i: number) => renderNode(child, i))}
        </blockquote>
      )
    }

    if (node.type === 'text') {
      let text: React.ReactNode = node.text

      if (node.format && node.format & 1) text = <strong key={index}>{text}</strong>
      if (node.format && node.format & 2) text = <em key={index}>{text}</em>
      if (node.format && node.format & 8) text = <u key={index}>{text}</u>
      if (node.format && node.format & 16) text = <code key={index} className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">{text}</code>

      return text
    }

    if (node.type === 'link') {
      return (
        <a key={index} href={node.url} className="text-blue-600 hover:underline dark:text-blue-400" target="_blank" rel="noopener noreferrer">
          {node.children?.map((child: RichTextNode, i: number) => renderNode(child, i))}
        </a>
      )
    }

    return null
  }

  return (
    <div className="prose-content">
      {content.root.children?.map((node: RichTextNode, index: number) => renderNode(node, index))}
    </div>
  )
}

export default async function BlogDetail({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  // ดึงข้อมูลบทความจาก Collection 'posts'
  const posts = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const post = posts.docs[0]

  if (!post) {
    notFound()
  }

  const coverImage = post.coverImage as { url?: string; alt?: string } | null
  const imageUrl = coverImage?.url || '/images/blog/blog1.webp'

  // ดึงบทความที่เกี่ยวข้อง (ล่าสุด 3 บทความ ยกเว้นบทความปัจจุบัน)
  const relatedPosts = await payload.find({
    collection: 'posts',
    where: { slug: { not_equals: slug } },
    limit: 3,
    sort: '-publishedAt',
  })

  return (
    <article className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <ArticleReadTracker title={post.title} />
      {/* Hero Section */}
      <header className="relative pt-28 pb-16 lg:pt-36 lg:pb-24">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950" />
        
        <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-blue-500 transition">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-blue-500 transition">Blog</Link>
              </li>
              <li>/</li>
              <li className="text-slate-900 dark:text-white font-medium truncate max-w-xs">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Tag */}
          {post.tag && (
            <span className="inline-block mb-6 bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-full">
              {post.tag}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-8 max-w-4xl">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-slate-600 dark:text-slate-400">
            {post.author && (
              <div className="flex items-center gap-2">
                <AuthorIcon />
                <span className="text-base">{post.author}</span>
              </div>
            )}
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <CalendarIcon />
                <time dateTime={post.publishedAt} className="text-base">
                  {formatDate(post.publishedAt)}
                </time>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto mb-12 lg:mb-16">
        <div className="relative aspect-video max-w-5xl mx-auto overflow-hidden rounded-xl shadow-lg">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto pb-16 lg:pb-24">
        <div className="max-w-3xl mx-auto">
          {/* Rich Text Content */}
          {post.content ? (
            <RichTextContentRenderer content={post.content as RichTextContent} />
          ) : (
            <p className="text-lg text-slate-600 dark:text-slate-400">
              No content available for this post.
            </p>
          )}

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Share this article
            </h3>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-500 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-500 text-slate-600 dark:text-slate-400 transition"
                aria-label="Share on Twitter"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-600 dark:text-slate-400 transition"
                aria-label="Share on Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-700 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-700 text-slate-600 dark:text-slate-400 transition"
                aria-label="Share on LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.docs.length > 0 && (
        <section className="bg-slate-50 dark:bg-slate-900 py-16 lg:py-24">
          <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-10">
              Related Articles
            </h2>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.docs.map((relatedPost) => {
                const relatedCoverImage = relatedPost.coverImage as { url?: string } | null
                const relatedImageUrl = relatedCoverImage?.url || '/images/blog/blog1.webp'
                
                return (
                  <article key={relatedPost.id} className="group">
                    <Link href={`/blog/${relatedPost.slug}`} className="block">
                      <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                        <Image
                          src={relatedImageUrl}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {relatedPost.tag && (
                          <span className="absolute left-4 top-4 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-md">
                            {relatedPost.tag}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-500 transition line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      {relatedPost.publishedAt && (
                        <time className="text-sm text-slate-500 dark:text-slate-400 mt-2 block">
                          {formatDate(relatedPost.publishedAt)}
                        </time>
                      )}
                    </Link>
                  </article>
                )
              })}
            </div>

            {/* View All Button */}
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
              >
                View All Articles
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12.172 7L6.808 1.636L8.222 0.222L16 8L8.222 15.778L6.808 14.364L12.172 9H0V7H12.172Z" fill="currentColor" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </article>
  )
}