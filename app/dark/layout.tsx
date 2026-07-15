import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "湖雾岭咨询｜AI驱动文化共识与品牌增长",
  description: "企业品牌全生命周期顾问。AI驱动企业文化、品牌定位、内容IP与整合营销。",
  openGraph: {
    title: "湖雾岭咨询｜企业品牌全生命周期顾问",
    description: "AI驱动文化共识与品牌增长",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "/dark-og.png", width: 1586, height: 992, alt: "湖雾岭咨询深色科技版" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "湖雾岭咨询｜企业品牌全生命周期顾问",
    description: "AI驱动文化共识与品牌增长",
    images: ["/dark-og.png"],
  },
};

export default function DarkLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
