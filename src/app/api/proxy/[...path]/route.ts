import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleProxy(req, await params);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleProxy(req, await params);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleProxy(req, await params);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleProxy(req, await params);
}

async function handleProxy(req: NextRequest, params: { path: string[] }) {
  const path = params.path.join("/");
  const searchParams = req.nextUrl.searchParams.toString();
  
  // API URL'yi çevreden al
  const apiBase = (process.env.NEXT_PUBLIC_API_BASE ?? "").replace(/\/+$/, "");
  if (!apiBase) {
    return NextResponse.json({ error: "API base url is not configured" }, { status: 500 });
  }

  const url = `${apiBase}/api/${path}${searchParams ? `?${searchParams}` : ""}`;
  
  // Gizli şifreyi al
  const apiKey = process.env.API_SECRET_KEY || "";

  // Gelen isteğin header'larını al (Host hariç)
  const headers = new Headers();
  req.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "host") {
      headers.set(key, value);
    }
  });

  // Güvenlik anahtarını ekle
  headers.set("x-api-key", apiKey);

  const init: RequestInit = {
    method: req.method,
    headers,
  };

  // Eğer istekte body varsa ekle
  if (req.method !== "GET" && req.method !== "HEAD") {
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      init.body = await req.formData();
    } else {
      init.body = await req.text();
    }
  }

  try {
    const res = await fetch(url, init);
    const contentType = res.headers.get("content-type") || "";
    
    // Eğer yanıt JSON ise
    if (contentType.includes("application/json")) {
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    } 
    // Değilse düz metin döndür
    else {
      const text = await res.text();
      return new NextResponse(text, { 
        status: res.status,
        headers: { "Content-Type": contentType }
      });
    }
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Failed to fetch from backend API" }, { status: 502 });
  }
}
