import type { NextConfig } from "next";

function buildCsp(): string {
  const isProd = process.env.NODE_ENV === "production";
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const connectSrc = ["'self'"];
  const scriptSrc = ["'self'"];

  if (apiBaseUrl) {
    try {
      connectSrc.push(new URL(apiBaseUrl).origin);
    } catch {
      // Ignore invalid env value and keep strict self-only fallback.
    }
  }

  // Next.js runtime uses inline bootstrapping scripts in both dev and prod.
  // Keep eval restricted to development only.
  scriptSrc.push("'unsafe-inline'");
  if (!isProd) {
    scriptSrc.push("'unsafe-eval'");
  }

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "img-src 'self' data:",
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    `script-src ${scriptSrc.join(" ")}`,
    `connect-src ${connectSrc.join(" ")}`,
    "object-src 'none'",
  ].join("; ");
}

const nextConfig: NextConfig = {
  async headers() {
    const csp = buildCsp();
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
