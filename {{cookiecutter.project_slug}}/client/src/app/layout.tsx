import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'primeflex/primeflex.css'
import '@/styles/app.scss'
import { AuthContextProvider } from '@/components/contexts/AuthContext'
import { AppStateContextProvider } from '@/components/contexts/AppStateContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Travel With Me - Plan trips, Record travels, discover more',
	description: ''
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const deviceLanguage = window.navigator?.language?.split('-')?.[0]

	return (
		<html lang="en">
			<body className={inter.className}>
                <AppStateContextProvider deviceLanguage={deviceLanguage}>
                    <AuthContextProvider>
				        {children}
                    </AuthContextProvider>
                </AppStateContextProvider>
			</body>
		</html>
	)
}
