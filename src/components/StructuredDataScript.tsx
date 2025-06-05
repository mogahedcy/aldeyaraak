
export default function StructuredDataScript() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "محترفين الديار العالمية",
    "alternateName": "الديار العالمية",
    "url": "https://aldeyarksa.tech",
    "logo": "https://aldeyarksa.tech/favicon.svg",
    "description": "شركة متخصصة في المظلات، البرجولات، السواتر، ساندوتش بانل، ترميم الملحقات، تنسيق الحدائق، بيوت الشعر التراثية، والخيام الملكية في جدة والمملكة العربية السعودية",
    "foundingDate": "2009",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "جدة",
      "addressRegion": "منطقة مكة المكرمة",
      "addressCountry": "SA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+966-12-123-4567",
      "contactType": "customer service",
      "availableLanguage": "Arabic"
    },
    "sameAs": [
      "https://www.facebook.com/aldeyarksa",
      "https://www.instagram.com/aldeyarksa",
      "https://twitter.com/aldeyarksa"
    ],
    "areaServed": {
      "@type": "State",
      "name": "المملكة العربية السعودية"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "خدماتنا",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "مظلات السيارات",
            "description": "تركيب وتصميم مظلات السيارات عالية الجودة"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "برجولات الحدائق",
            "description": "تصميم وتنفيذ برجولات خشبية ومعدنية للحدائق"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "سواتر الخصوصية",
            "description": "تركيب سواتر للخصوصية والحماية"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "ساندوتش بانل",
            "description": "تركيب ألواح الساندوتش بانل للعزل والبناء"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "ترميم الملحقات",
            "description": "خدمات ترميم وصيانة الملحقات والمباني"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "تنسيق الحدائق",
            "description": "تصميم وتنسيق الحدائق والمساحات الخضراء"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "بيوت الشعر التراثية",
            "description": "تصميم وبناء بيوت الشعر التراثية الأصيلة"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "الخيام الملكية",
            "description": "تأجير وتركيب الخيام الملكية للمناسبات"
          }
        }
      ]
    }
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://aldeyarksa.tech/#organization",
    "name": "محترفين الديار العالمية",
    "image": "https://aldeyarksa.tech/favicon.svg",
    "url": "https://aldeyarksa.tech",
    "telephone": "+966-12-123-4567",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "شارع الأمير سلطان",
      "addressLocality": "جدة",
      "addressRegion": "منطقة مكة المكرمة",
      "postalCode": "21423",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.5433,
      "longitude": 39.1728
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "125"
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "محترفين الديار العالمية",
    "url": "https://aldeyarksa.tech",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://aldeyarksa.tech/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "الرئيسية",
        "item": "https://aldeyarksa.tech"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "خدماتنا",
        "item": "https://aldeyarksa.tech/#services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "معرض الأعمال",
        "item": "https://aldeyarksa.tech/portfolio"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "اتصل بنا",
        "item": "https://aldeyarksa.tech/contact"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
    </>
  );
}
