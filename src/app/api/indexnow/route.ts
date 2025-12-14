// IndexNow API - Bing ve diğer arama motorlarına anında bildirim
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    const indexNowKey = process.env.INDEXNOW_KEY || 'demo-key-12345'; // .env'e ekle
    const host = 'kykyemekliste.com';
    
    // IndexNow API'ye bildirim gönder
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host,
        key: indexNowKey,
        keyLocation: `https://${host}/${indexNowKey}.txt`,
        urlList: [url]
      })
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'URL IndexNow\'a gönderildi' });
    } else {
      return NextResponse.json({ success: false, error: 'IndexNow hatası' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
