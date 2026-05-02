"use client";

import { useState, useEffect } from "react";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  image: any;
  description?: string;
  // Sanity'de bu alanları açarsan buraya düşer:
  category?: string;
  standards?: string[];
}

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<"TR" | "EN">("TR");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const query = `*[_type == "product" && _id == "${params.id}"][0]`;
        const data = await client.fetch(query);
        setProduct(data);
      } catch (error) {
        console.error("Detay çekme hatası:", error);
      }
    };
    if (params.id) fetchProduct();
  }, [params.id]);

  // Sayfa içi metinler
  const t = {
    TR: {
      back: "← GERİ DÖN",
      subtitle: "Neva Mühendislik Teknolojileri",
      origin: "MENŞEİ",
      originVal: "TÜRKİYE — NEVA FACTORY",
      class: "SINIFLANDIRMA",
      classVal: "ENDÜSTRİYEL KORUMA",
      specs: "PERFORMANS DEĞERLERİ",
      quote: "TEKLİF AL / WHATSAPP",
      standardLabel: "AVRUPA STANDARTLARI",
      usage: "KULLANIM ALANLARI",
      usageVal: "Otomotiv, Metal İşleme, Lojistik, İnşaat"
    },
    EN: {
      back: "← BACK TO LIST",
      subtitle: "Neva Engineering Technologies",
      origin: "ORIGIN",
      originVal: "TURKIYE — NEVA FACTORY",
      class: "CLASSIFICATION",
      classVal: "INDUSTRIAL PROTECTION",
      specs: "PERFORMANCE LEVELS",
      quote: "GET QUOTE / WHATSAPP",
      standardLabel: "EUROPEAN STANDARDS",
      usage: "APPLICATIONS",
      usageVal: "Automotive, Metalworking, Logistics, Construction"
    }
  }[lang];

  if (!product) return (
    <div className="h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <div className="animate-pulse tracking-[0.5em] font-black uppercase italic">Neva Loading...</div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDark ? "bg-[#0a0a0a] text-white" : "bg-[#f8f9fa] text-slate-900"} selection:bg-blue-600 selection:text-white`}>
      
      {/* Üst Navigasyon */}
      <nav className="p-10 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link href="/" className="text-[10px] font-black tracking-[0.3em] uppercase border-b-2 border-blue-600 pb-1 hover:text-blue-600 transition-colors">
          {t.back}
        </Link>
        
        <div className="flex items-center space-x-6">
          <div className="flex space-x-3 text-[10px] font-black tracking-widest border-r pr-6 border-current/10">
            <button onClick={() => setLang("TR")} className={lang === "TR" ? "text-blue-600" : "opacity-40"}>TR</button>
            <button onClick={() => setLang("EN")} className={lang === "EN" ? "text-blue-600" : "opacity-40"}>EN</button>
          </div>
          <button onClick={() => setIsDark(!isDark)} className="text-sm">
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-10 py-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        {/* Sol Kolon: Görsel */}
        <div className="sticky top-32">
          <div className={`aspect-[4/5] rounded-[40px] flex items-center justify-center transition-all duration-700 ${isDark ? "bg-white/5 border border-white/10" : "bg-white shadow-2xl shadow-blue-900/5 border border-slate-100"}`}>
            {product.image && (
              <img 
                src={urlFor(product.image).url()} 
                alt={product.name} 
                className="w-full h-full object-contain p-12 md:p-20 hover:scale-105 transition-transform duration-700" 
              />
            )}
          </div>
          <div className="mt-8 flex justify-center space-x-4 opacity-20 font-black italic text-sm italic tracking-widest uppercase">
            <span>CE</span> <span>EN 388</span> <span>EN 420</span>
          </div>
        </div>

        {/* Sağ Kolon: İçerik */}
        <div className="flex flex-col py-4">
          <span className="text-blue-600 font-bold tracking-[0.4em] uppercase text-[10px] mb-4 flex items-center">
            <span className="w-8 h-[2px] bg-blue-600 mr-3"></span> {t.subtitle}
          </span>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9] italic">
            {product.name}
          </h1>

          <p className={`text-xl font-light leading-relaxed mb-12 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {product.description || "Neva'nın endüstriyel güvenlik vizyonuyla, en zorlu saha koşulları için optimize edilmiş üst düzey koruma çözümü."}
          </p>

          {/* Teknik Özellikler Tablosu */}
          <div className={`mb-12 rounded-3xl p-8 border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"}`}>
            <h3 className="text-xs font-black tracking-widest uppercase mb-6 text-blue-600">{t.specs}</h3>
            <div className="space-y-4">
              {[
                { label: lang === "TR" ? "Aşınma Direnci" : "Abrasion Resistance", val: "4 / 4" },
                { label: lang === "TR" ? "Kesilme Direnci" : "Cut Resistance", val: "X / 5" },
                { label: lang === "TR" ? "Yırtılma Direnci" : "Tear Resistance", val: "3 / 4" },
                { label: lang === "TR" ? "Delinme Direnci" : "Puncture Resistance", val: "2 / 4" },
              ].map((spec, i) => (
                <div key={i} className="flex justify-between items-center border-b border-current/5 pb-2">
                  <span className="text-[11px] font-bold uppercase opacity-50">{spec.label}</span>
                  <span className="font-black italic">{spec.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Menşei ve Sınıflandırma */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <span className="block text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">{t.class}</span>
              <span className="font-bold text-sm uppercase">{t.classVal}</span>
            </div>
            <div>
              <span className="block text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">{t.origin}</span>
              <span className="font-bold text-sm uppercase">{t.originVal}</span>
            </div>
          </div>

          {/* Kullanım Alanları */}
          <div className="mb-12">
            <span className="block text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">{t.usage}</span>
            <p className="text-sm font-medium opacity-70">{t.usageVal}</p>
          </div>

          <button className="group relative overflow-hidden bg-blue-600 hover:bg-slate-900 text-white py-8 rounded-2xl font-black tracking-[0.3em] uppercase transition-all shadow-2xl shadow-blue-500/20">
            <span className="relative z-10">{t.quote}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>
      </main>

      {/* Alt Bölüm / Footer */}
      <footer className="py-20 border-t border-current/5 mt-20 opacity-30 text-center">
         <span className="text-xl font-black tracking-tighter uppercase italic">Neva. Safety Technologies</span>
      </footer>
    </div>
  );
}