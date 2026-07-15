import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://knighty-hub-hit.github.io/huwuling-consulting/"),
  title: "湖雾岭咨询｜让品牌穿越周期",
  description: "AI技术驱动的企业文化、品牌战略与整合营销咨询。12年平台锤炼，上万家企业服务陪跑。",
  icons: {
    icon: "https://knighty-hub-hit.github.io/huwuling-consulting/favicon.svg",
    shortcut: "https://knighty-hub-hit.github.io/huwuling-consulting/favicon.svg",
  },
  openGraph: {
    title: "湖雾岭咨询｜让品牌穿越周期",
    description: "企业文化 × 品牌战略 × 整合营销",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "湖雾岭咨询，让品牌穿越周期" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "湖雾岭咨询｜让品牌穿越周期",
    description: "企业文化 × 品牌战略 × 整合营销",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
