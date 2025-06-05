
'use client';

import { useEffect, useState } from 'react';

interface ClientBodyProps {
  children: React.ReactNode;
}

export default function ClientBody({ children }: ClientBodyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // تجنب مشكلة hydration mismatch
  if (!mounted) {
    return (
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </body>
    );
  }

  return (
    <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {children}
    </body>
  );
}
