"use client"

import { useEffect, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { FB_PIXEL_ID, pageview } from "@/lib/fpixel"

// Separate component that uses useSearchParams
function FacebookPixelEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Trigger PageView เมื่อ URL เปลี่ยน
  useEffect(() => {
    pageview()
  }, [pathname, searchParams])

  return null
}

export default function FacebookPixel() {
  return (
    <>
      {/* ฝัง Global Script */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
          `,
        }}
      />
      {/* Wrap useSearchParams in Suspense boundary */}
      <Suspense fallback={null}>
        <FacebookPixelEvents />
      </Suspense>
    </>
  )
}