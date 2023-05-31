import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'App services List Demo',
  description: 'This is a demo of an app that uses the REST API in the Next.js framework to get services.',
  author: 'Chandra Prakash Sharma',
  linkedinId: 'https://www.linkedin.com/in/cpntr/'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-800 text-slate-100 container mx-auto p-4`}>
        {children}
        </body>
    </html>
  )
}
