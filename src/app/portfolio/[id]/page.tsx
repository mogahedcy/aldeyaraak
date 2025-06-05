import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectDetailsClient from './ProjectDetailsClient';

interface Props {
  params: Promise<{ id: string }>;
}

// دالة لجلب بيانات المشروع من API
async function getProject(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/projects/${id}`, {
      cache: 'no-store', // تجديد البيانات في كل طلب
    });

    if (!response.ok) {
      return null;
    }

    const project = await response.json();
    return project; // إرجاع المشروع مباشرة
  } catch (error) {
    console.error('خطأ في جلب المشروع:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return {
      title: 'مشروع غير موجود - محترفين الديار العالمية',
    };
  }

  return {
    title: `${project.title} - محترفين الديار العالمية`,
    description: project.description,
    keywords: `${project.title}, محترفين الديار العالمية, ${project.category}, ${project.location}`,
    openGraph: {
      title: `${project.title} - محترفين الديار العالمية`,
      description: project.description,
      images: project.mediaItems?.filter((item: any) => item.type === 'IMAGE').map((item: any) => item.src) || [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - محترفين الديار العالمية`,
      description: project.description,
      images: project.mediaItems?.filter((item: any) => item.type === 'IMAGE').map((item: any) => item.src) || [],
    },
  };
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  // إعداد structured data
  const images = project.mediaItems?.filter((item: any) => item.type === 'IMAGE') || [];
  const videos = project.mediaItems?.filter((item: any) => item.type === 'VIDEO') || [];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "creator": {
      "@type": "Organization",
      "name": "محترفين الديار العالمية",
      "url": "https://aldeyarksa.tech"
    },
    "dateCreated": project.createdAt,
    "dateModified": project.updatedAt,
    "locationCreated": {
      "@type": "Place",
      "name": project.location
    },
    "category": project.category,
    "image": images.map((item: any) => ({
      "@type": "ImageObject",
      "url": item.src,
      "caption": item.title || project.title,
      "encodingFormat": "image/jpeg"
    })),
    "video": videos.map((item: any) => ({
      "@type": "VideoObject",
      "name": item.title || project.title,
      "description": item.description || project.description,
      "contentUrl": item.src,
      "encodingFormat": "video/mp4",
      "uploadDate": project.createdAt
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Navbar />
      <ProjectDetailsClient project={project} />
      <Footer />
    </>
  );
}