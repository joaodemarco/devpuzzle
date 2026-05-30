import './globals.css';
import { Metadata, Viewport } from 'next';
import { Sora } from 'next/font/google';
import { cn } from '@/lib/utils';
import { BASE_URL } from '@/lib/constants';

const sora = Sora({ subsets: ['latin'], variable: '--font-sans' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | Devpuzzle',
    default: 'The daily challenge for developers | Devpuzzle',
  },
  description:
    'Test your developer knowledge every day. Guess the technology, reveal the code snippet and identify the logo — three unique daily challenges for developers. Free, fast, no signup.',
  applicationName: 'Devpuzzle',
  category: 'game',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'developer game',
    'programming puzzle',
    'daily coding challenge',
    'tech quiz',
    'guess the technology',
    'developer trivia',
    'programming language game',
    'wordle for developers',
    'software development game',
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
    date: false,
  },
  authors: [{ name: 'Devpuzzle', url: BASE_URL }],
  creator: 'Devpuzzle',
  publisher: 'Devpuzzle',

  // There's no need to explicity add the images to OpenGraph and Twitter
  // because Next's file-based metadata automatically serves the file
  openGraph: {
    title: 'Devpuzzle',
    description:
      'Test your developer knowledge every day. Guess the technology, reveal the code snippet, and identify the logo.',
    url: BASE_URL,
    siteName: 'Devpuzzle',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devpuzzle',
    description:
      'Test your developer knowledge every day. Guess the technology, reveal the code snippet, and identify the logo.',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    title: 'Devpuzzle',
    statusBarStyle: 'default',
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DevPuzzle',
    url: BASE_URL,
    description:
      'A daily puzzle game for developers. Guess the technology, reveal the code snippet, and identify the logo.',
  };

  return (
    <html
      lang="en"
      className={cn('h-full antialiased', 'font-sans', sora.variable)}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        {children}
      </body>
    </html>
  );
}
