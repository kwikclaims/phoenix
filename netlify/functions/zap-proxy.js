export async function handler(event) {
  console.log("🚀 Function zap-proxy started at:", new Date().toISOString());
  console.log("📥 Event method:", event.httpMethod);
  console.log("📍 Event headers:", JSON.stringify(event.headers, null, 2));
  
  const origin = event.headers.origin || "";
  
  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    console.log("✅ Handling OPTIONS preflight request");
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, PUT, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Accept",
        "Access-Control-Max-Age": "86400"
      },
      body: ""
    };
  }

  try {
    console.log("🔍 Checking environment variables...");
    console.log("🔑 ZAPIER_UPDATE_WEBHOOK_URL exists:", !!process.env.ZAPIER_UPDATE_WEBHOOK_URL);
    console.log("🔑 ZAPIER_UPDATE_WEBHOOK_URL value:", process.env.ZAPIER_UPDATE_WEBHOOK_URL ? "SET" : "NOT SET");
    
    if (event.httpMethod !== "PUT" && event.httpMethod !== "POST") {
      console.log("❌ Method not allowed:", event.httpMethod);
      return resp(405, { error: "Method Not Allowed" });
    }

    const url = process.env.ZAPIER_UPDATE_WEBHOOK_URL;
    if (!url) {
      console.error("❌ Missing ZAPIER_UPDATE_WEBHOOK_URL environment variable");
      return resp(500, { error: "Missing ZAPIER_UPDATE_WEBHOOK_URL" });
    }

    const body = event.body || "{}";
    console.log("📦 Request body length:", body.length);
    console.log("📦 Request body preview:", body.substring(0, 200) + (body.length > 200 ? "..." : ""));

    // Zapier Webhooks expect POST
    console.log("🌐 Making fetch request to Zapier webhook...");
    console.log("🎯 Target URL:", url.substring(0, 50) + "...");
    
    const r = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin
      },
      body,
    });

    console.log("📡 Zapier response status:", r.status);
    console.log("📡 Zapier response headers:", JSON.stringify(Object.fromEntries(r.headers.entries()), null, 2));
    
    const text = await r.text();
    console.log("📄 Zapier response text length:", text.length);
    console.log("📄 Zapier response preview:", text.substring(0, 200) + (text.length > 200 ? "..." : ""));
    
    let json = null;
    try { 
      json = text ? JSON.parse(text) : null; 
      console.log("✅ Successfully parsed Zapier response as JSON");
    } catch (parseError) {
      console.warn("⚠️ Failed to parse Zapier response as JSON:", parseError.message);
    }

    if (!r.ok) {
      console.error("❌ Zapier webhook returned error status:", r.status);
      console.error("❌ Zapier error response:", text);
      return resp(r.status, json ?? { error: text || `Upstream error ${r.status}` });
    }
    
    console.log("✅ Zapier webhook call successful");
    return resp(200, json ?? { ok: true, raw: text });
  } catch (err) {
    console.error("💥 zap-proxy failed with error:", err);
    console.error("💥 Error name:", err?.name);
    console.error("💥 Error message:", err?.message);
    console.error("💥 Error stack:", err?.stack);
    return resp(500, { error: err?.message || "Server error" });
  }
}

function resp(status, body) {
  console.log("📤 Sending response - Status:", status, "Body:", JSON.stringify(body));
  return {
    statusCode: status,
    headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(body),
  };
}