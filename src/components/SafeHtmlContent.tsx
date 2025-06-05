import DOMPurify from 'isomorphic-dompurify';

interface SafeHtmlContentProps {
  content: string;
  className?: string;
}

export default function SafeHtmlContent({ content, className = "" }: SafeHtmlContentProps) {
  // تنظيف المحتوى من أي عناصر ضارة
  const cleanContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'span', 'strong', 'em', 'b', 'i', 'u', 'ul', 'ol', 'li', 'a', 'br', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'blockquote', 'code', 'pre'],
    ALLOWED_ATTR: ['class', 'href', 'target', 'rel', 'id', 'style'],
    ALLOWED_SCHEMES: ['http', 'https', 'mailto', 'tel']
  });

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  );
}
