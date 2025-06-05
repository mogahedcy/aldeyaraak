
export async function POST() {
  try {
    // إشعار جوجل بتحديث sitemap
    const sitemapUrl = 'https://aldeyarksa.tech/sitemap.xml';
    const googleUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    
    // إرسال ping لجوجل
    await fetch(googleUrl);
    
    return Response.json({ 
      success: true, 
      message: 'تم إشعار جوجل بتحديث sitemap' 
    });
  } catch (error) {
    console.error('خطأ في إشعار جوجل:', error);
    return Response.json({ 
      success: false, 
      error: 'فشل في إشعار جوجل' 
    }, { status: 500 });
  }
}
