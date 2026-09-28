import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s • Devpuzzle',
    default: 'The daily challenge for developers • Devpuzzle',
  },
  description:
    'Test your developer knowledge every day. Guess the technology, reveal the code snippet and identify the logo — three unique daily challenges for developers. Free, fast, no signup.',
  applicationName: 'Devpuzzle',
  category: 'game',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
    date: false,
  },

  openGraph: {
    title: 'Devpuzzle',
    description: 'A daily puzzle game for developers',
    siteName: 'Devpuzzle',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Devpuzzle',
    description: 'A daily puzzle game for developers',
  },

  robots: {
    index: true,
    follow: true,
  },

  appleWebApp: {
    title: 'Devpuzzle',
    statusBarStyle: 'default',
    capable: true,
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className='h-full antialiased'>
      <body className='flex min-h-full flex-col'>{children}</body>
    </html>
  );
}
