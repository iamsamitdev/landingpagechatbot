import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
      useAsTitle: 'title',
    },
    fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            admin: {
              description: 'Brief summary of the post',
            },
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            description: 'URL-friendly identifier (e.g., my-blog-post)',
          },
        },
        {
          name: 'content',
          type: 'richText',
        },
        {
          name: 'coverImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'tag',
          type: 'text',
          admin: {
            description: 'Category tag (e.g., Development, Design)',
          },
        },
        {
          name: 'author',
          type: 'text',
          defaultValue: 'Admin',
        },
        {
          name: 'publishedAt',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
      ],
}