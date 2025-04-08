import './globals.css'

export const metadata = {
  title: 'Hellcare',
  description: 'A darkly humorous adventure game about navigating the healthcare system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 