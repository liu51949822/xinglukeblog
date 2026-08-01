'use client';

import Script from 'next/script';

/**
 * 访问统计埋点
 * - 百度统计（hm.baidu.com）
 * - Google Analytics 4
 * 
 * 站点访问量统计。百度统计 ID 需在部署后配置到环境变量
 * NEXT_PUBLIC_BAIDU_ANALYTICS_ID，Google ID 为
 * NEXT_PUBLIC_GA_MEASUREMENT_ID。未配置则自动跳过。
 */

export function Analytics() {
  const baiduId = process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      {/* 百度统计 */}
      {baiduId && (
        <Script id="baidu-analytics" strategy="afterInteractive">
          {`
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?${baiduId}";
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(hm, s);
            })();
          `}
        </Script>
      )}

      {/* Google Analytics 4 */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
