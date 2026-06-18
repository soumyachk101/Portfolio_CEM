import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Space_Mono, Share_Tech_Mono } from 'next/font/google';
import "../index.css";
import ClientLayout from "./ClientLayout";
import { certificates } from "../data/certificates";
import { GridBackground } from "../components/GridBackground";

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const spaceMono = Space_Mono({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-mono',
});

const shareTech = Share_Tech_Mono({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-heading',
});

const SITE_URL = 'https://chksoumya.in';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'Soumya Chakraborty — Independent Developer',
        template: '%s | Soumya Chakraborty',
    },
    description:
        'Soumya Chakraborty — independent full-stack developer and CS undergraduate. Building production web products with React, Next.js, Node.js, and Python.',
    keywords: [
        'Soumya Chakraborty',
        'Full Stack Developer',
        'React Developer',
        'Next.js Developer',
        'Node.js Developer',
        'Software Engineer India',
        'Kolkata Developer',
        'Portfolio',
    ],
    authors: [{ name: 'Soumya Chakraborty', url: SITE_URL }],
    creator: 'Soumya Chakraborty',
    publisher: 'Soumya Chakraborty',
    applicationName: 'Soumya Chakraborty Portfolio',
    category: 'technology',
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: SITE_URL + '/',
        siteName: 'Soumya Chakraborty Portfolio',
        title: 'Soumya Chakraborty — Independent Developer',
        description:
            'Independent full-stack developer and CS undergraduate building production web products with React, Next.js, Node.js, and Python.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Soumya Chakraborty — Independent Developer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Soumya Chakraborty | Independent Developer',
        description:
            'Building production web products with React, Next.js, Node.js, and Python.',
        images: ['/og-image.png'],
        site: '@soumya_chk',
        creator: '@soumya_chk',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
    alternates: {
        canonical: SITE_URL + '/',
    },
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
            { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
            { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    manifest: '/manifest.json',
    verification: {
        google: 'google34fa8d6ffd2a7690',
    },
};

// Build JSON-LD at module load — uses the certificate data
const hasCredential = certificates.map((c) => ({
    '@type': 'EducationalOccupationalCredential',
    name: c.title,
    credentialCategory: c.isInternship ? 'internship' : 'certificate',
    recognizedBy: {
        '@type': 'Organization',
        name: c.issuer,
    },
    dateCreated: c.date,
    url: `${SITE_URL}/certificates/${c.id}`,
}));

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': SITE_URL + '/',
    },
    name: 'Soumya Chakraborty',
    givenName: 'Soumya',
    familyName: 'Chakraborty',
    alternateName: 'Soumya Chk',
    url: SITE_URL + '/',
    image: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
    },
    description:
        'CS undergraduate and Full Stack Developer with 2+ years of experience building modern web apps with React, Next.js, Node.js, and Python.',
    jobTitle: 'Full Stack Developer',
    worksFor: {
        '@type': 'Organization',
        name: 'Freelance / Open to Opportunities',
    },
    email: 'mailto:soumyachk1@gmail.com',
    telephone: '+91-8145850111',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kolkata',
        addressRegion: 'West Bengal',
        addressCountry: 'IN',
    },
    nationality: {
        '@type': 'Country',
        name: 'India',
    },
    knowsLanguage: ['en', 'hi'],
    alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'B.Tech Computer Science & Engineering',
    },
    knowsAbout: [
        'React', 'Next.js', 'Node.js', 'Python', 'TypeScript',
        'JavaScript', 'Tailwind CSS', 'FastAPI', 'MongoDB',
        'PostgreSQL', 'AWS', 'Docker', 'Git', 'AI', 'Machine Learning',
    ],
    hasCredential,
    award: [
        { '@type': 'Award', name: '1st Place — Code for Change 2.0 Hackathon', description: 'Built Neeti AI, an AI hiring platform with WebRTC video and collaborative IDE.' },
        { '@type': 'Award', name: 'Blockchain Nominee — Hacktropica 2K26', description: 'Built Phygital Trace, a blockchain supply chain ledger.' },
        { '@type': 'Award', name: 'RAG Finalist — Tekathon 2K26', description: 'Built a multimodal retrieval-augmented generation engine.' },
    ],
    sameAs: [
        'https://github.com/soumyachk101',
        'https://wa.me/918145850111',
        'https://www.instagram.com/soumya_chk',
    ],
};

const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL + '/',
    name: 'Soumya Chakraborty Portfolio',
    description:
        'Full Stack Developer portfolio of Soumya Chakraborty — React, Next.js, Node.js, Python.',
    inLanguage: 'en-IN',
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceMono.variable} ${shareTech.variable}`}>
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#000000" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
                />
            </head>
            <body>
                <GridBackground />
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:bg-foreground focus:text-background focus:px-4 focus:py-2 focus:rounded-none focus:outline-none focus:ring-2 focus:ring-accent"
                >
                    Skip to main content
                </a>
                <noscript>
                    <h1>Soumya Chakraborty — Independent Developer</h1>
                    <p>
                        Welcome to the portfolio of Soumya Chakraborty, an independent
                        full-stack developer and CS undergraduate based in Kolkata, India.
                        Specializing in React, Next.js, Node.js, and Python.
                    </p>
                    <p>
                        <Link href="/#projects">Projects</Link> ·{' '}
                        <Link href="/#capabilities">Capabilities</Link> ·{' '}
                        <Link href="/#contact">Contact</Link>
                    </p>
                </noscript>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
