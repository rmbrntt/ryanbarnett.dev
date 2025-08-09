import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'rb',
  description:
    'ryan\s blog exploring technology, humans and systems.',
  href: 'https://www.barnett.io',
  author: 'rmbrntt',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  // {
  //   href: '/blog',
  //   label: 'blog',
  // },
  // {
  //   href: '/authors',
  //   label: 'authors',
  // },
  // {
  //   href: '/about',
  //   label: 'about',
  // },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/rmbrntt',
    label: 'GitHub',
  },
  {
    href: 'https://twitter.com/__ryanbarnett',
    label: 'Twitter',
  },
  {
    href: 'mailto:ryan@barnett.io',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
