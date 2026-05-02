"use client";

import { useState, useEffect } from "react";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  image: any;
  description?: string;
}

export default function IndexPage() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<"TR" | "EN">("TR"); // Dil yönetimi
  const [products, setProducts] = useState<Product[]>([]);

  // Metin İçerikleri (İleride burası da Sanity'den gelebilir)
  const content = {
    TR: {
      nav: ["Kurumsal", "Koleksiyon", "İletişim", "TEKLİF AL"],
      hero: ["Neva Güvenlik Teknolojileri", "ÜSTÜN", "KORUMA."],
      aboutTitle: ["Geleceği", "Güvenle", "Kavrayın."],
      aboutDesc: "Endüstriyel iş sahalarının zorluklarını biliyoruz. Neva olarak, insan elinin hassasiyetini en yüksek koruma teknolojileriyle birleştiriyoruz.",
      stats: ["Ülke Ağı", "Yerli Üretim"],
      productsTitle: "Ürün Serileri",
      contactTitle: "Bize Yazın.",
      address: "Adres",
      email: "E-Posta"
    },
    EN: {
      nav: ["Corporate", "Collection", "Contact", "GET QUOTE"],
      hero: ["Neva Safety Technologies", "SUPERIOR", "PROTECTION."],
      aboutTitle: ["Grip the", "Future with", "Confidence."],
      aboutDesc: "We know the challenges of industrial worksites. As Neva, we combine human hand precision with the highest protection technologies.",
      stats: ["Global Network", "Native Production"],
      productsTitle: "Product Series",
      contactTitle: "Contact Us.",
      address: "Address",
      email: "E-Mail"
    }
  };

  const t = content[lang];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"]`;
        const data = await client.fetch(query);
        setProducts(data || []);
      } catch (error) {
        console.error("Sanity Veri Hatası:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={`transition-colors duration-700 ${isDark ? "bg-[#0a0a0a] text-white" : "bg-[#f8f9fa] text-slate-900"} min-h-screen font-sans overflow-x-hidden`}>
      
      {/* 1. NAVİGASYON */}
      <nav className={`fixed top-0 w-full z-[100] px-6 md:px-10 py-6 flex items-center justify-between transition-all duration-700 ${isDark ? "bg-black/80 border-white/5" : "bg-white/80 border-slate-100"} backdrop-blur-xl border-b`}>
        <div className="flex items-center space-x-3">
          <div className="h-8 w-[2px] bg-blue-600"></div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">Neva</span>
        </div>
        
        <div className="hidden lg:flex space-x-10 text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">
          <a href="#about" className="hover:text-blue-600 transition">{t.nav[0]}</a>
          <a href="#products" className="hover:text-blue-600 transition">{t.nav[1]}</a>
          <a href="#contact" className="hover:text-blue-600 transition">{t.nav[2]}</a>
        </div>

        <div className="flex items-center space-x-6">
          {/* Dil Seçici */}
          <div className="flex space-x-2 text-[10px] font-black tracking-widest border-x px-4 border-current/10">
            <button onClick={() => setLang("TR")} className={`${lang === "TR" ? "text-blue-600" : "opacity-40"}`}>TR</button>
            <span className="opacity-20">/</span>
            <button onClick={() => setLang("EN")} className={`${lang === "EN" ? "text-blue-600" : "opacity-40"}`}>EN</button>
          </div>

          <button onClick={() => setIsDark(!isDark)} className="text-lg">{isDark ? "☀️" : "🌙"}</button>
          
          <button className={`px-6 py-2.5 text-[10px] font-bold tracking-widest rounded-full transition-all transform hover:scale-105 ${isDark ? "bg-white text-black" : "bg-slate-900 text-white shadow-xl shadow-blue-100"}`}>
            {t.nav[3]}
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center px-10 md:px-20 overflow-hidden">
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${isDark ? "opacity-10" : "opacity-[0.03]"} select-none z-0`}>
          <h1 className="text-[45vw] font-black leading-none text-blue-600 pointer-events-none">NEVA</h1>
        </div>

        <div className="relative z-10 max-w-6xl">
          <span className={`font-bold text-xs tracking-[0.5em] uppercase mb-8 block ${isDark ? "text-blue-400" : "text-blue-600"}`}>
            {t.hero[0]} — 2026
          </span>
          <h2 className={`text-6xl md:text-[140px] font-black leading-[0.85] tracking-tighter uppercase italic transition-colors duration-700 ${isDark ? "text-white" : "text-slate-900"}`}>
            {t.hero[1]} <br /> 
            <span className={`transition-colors duration-700 ${isDark ? "text-slate-600" : "text-blue-600"}`}>
              {t.hero[2]}
            </span>
          </h2>
          <div className={`h-2 w-32 mt-12 ${isDark ? "bg-blue-500" : "bg-blue-600"}`}></div>
        </div>
      </section>

      {/* Sertifika Şeridi (İhracat için kritik) */}
      <div className={`py-10 border-y ${isDark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-200"}`}>
        <div className="max-w-7xl mx-auto px-10 flex flex-wrap justify-center gap-12 opacity-30 grayscale italic font-black text-sm tracking-widest">
           <span>ISO 9001:2015</span>
           <span>CE EN 388</span>
           <span>EN 420+A1</span>
           <span>OEKO-TEX®</span>
           <span>MADE IN TÜRKİYE</span>
        </div>
      </div>

      {/* 3. KURUMSAL GÜÇ (About) */}
      <section id="about" className={`py-40 px-10 ${isDark ? "bg-white/[0.01]" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-video bg-slate-800 rounded-[40px] overflow-hidden shadow-2xl flex items-center justify-center">
             <div className="absolute inset-0 bg-blue-600/10"></div>
             <span className="text-white/20 font-black tracking-widest uppercase italic text-xs">Production Excellence</span>
          </div>
          <div>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-none">
              {t.aboutTitle[0]} <br /> <span className="text-blue-600">{t.aboutTitle[1]}</span> {t.aboutTitle[2]}
            </h3>
            <p className={`text-xl font-light leading-relaxed mb-12 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {t.aboutDesc}
            </p>
            <div className="flex space-x-12">
              <div>
                <span className="block text-5xl font-black text-blue-600 italic">20+</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">{t.stats[0]}</span>
              </div>
              <div className={`w-[1px] h-16 ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
              <div>
                <span className="block text-5xl font-black text-blue-600 italic">100%</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">{t.stats[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 SEKTÖRLER (Görsel Şölen) */}
<section className="py-32 px-10">
  <div className="max-w-7xl mx-auto">
    <div className="flex justify-between items-end mb-20">
      <h2 className="text-4xl font-black uppercase tracking-tighter italic">Sektörel <br /> <span className="text-blue-600">Odak noktaları.</span></h2>
      <p className="text-[10px] font-bold opacity-40 tracking-[0.3em] uppercase max-w-[200px]">Her endüstri için özel mühendislik çözümleri.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {['Otomotiv', 'Metal', 'Lojistik', 'Gıda'].map((item, i) => (
        <div key={i} className="group relative h-[400px] rounded-[30px] overflow-hidden cursor-pointer">
          <div className="absolute inset-0 bg-slate-900 transition-transform duration-700 group-hover:scale-110 opacity-40"></div>
          {/* Buraya gerçek sektör fotoğrafları gelecek */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
          <div className="absolute bottom-10 left-10">
            <span className="text-blue-500 font-black italic text-xl mb-2 block">0{i+1}</span>
            <h4 className="text-white text-2xl font-black uppercase tracking-tighter">{item}</h4>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* 4. ÜRÜN KOLEKSİYONU */}
      <main id="products" className="max-w-7xl mx-auto px-6 py-40">
        <div className="flex flex-col items-center mb-24">
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">{t.productsTitle}</h2>
          <div className="h-1 w-20 bg-blue-600"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <Link href={`/product/${product._id}`} key={product._id} className="group">
              <div className={`p-10 rounded-[50px] transition-all duration-700 border ${isDark ? "bg-white/5 border-white/5 hover:bg-white/10" : "bg-white border-slate-100 hover:shadow-3xl shadow-sm"}`}>
                <div className={`relative aspect-square rounded-[35px] overflow-hidden mb-10 ${isDark ? "bg-black/20" : "bg-slate-50"}`}>
                  {product.image && (
                    <img 
                      src={urlFor(product.image).url()} 
                      alt={product.name} 
                      className={`w-full h-full object-contain p-14 transition-transform duration-1000 group-hover:scale-110`}
                    />
                  )}
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-4">{product.name}</h3>
                <div className={`h-0.5 w-10 transition-all duration-500 group-hover:w-full ${isDark ? "bg-blue-400" : "bg-blue-600"}`}></div>
                <p className="mt-6 text-sm font-light leading-relaxed opacity-60">
                   {lang === "TR" ? (product.description || "Neva özel serisi.") : "Neva premium series."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* 5. İLETİŞİM */}
      <section id="contact" className={`py-40 px-10 ${isDark ? "bg-black" : "bg-slate-50"}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-1">
            <h3 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-none">{t.contactTitle}</h3>
            <div className="space-y-10 mt-12">
              <div>
                <span className="block text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">{t.address}</span>
                <p className="text-sm font-bold opacity-80 uppercase tracking-tighter italic">Ikitelli O.S.B. Teknoloji Ave. No: 44, Istanbul/TR</p>
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">{t.email}</span>
                <p className="text-sm font-bold opacity-80 uppercase tracking-tighter">info@neva.com.tr</p>
              </div>
            </div>
          </div>
          <div className={`lg:col-span-2 h-[500px] rounded-[50px] overflow-hidden border-8 ${isDark ? "border-white/5 bg-white/5" : "border-white bg-slate-200 shadow-2xl"} grayscale hover:grayscale-0 transition-all duration-1000 flex items-center justify-center`}>
              <span className="text-xs font-black tracking-[0.5em] opacity-20 uppercase">Global Maps Integration</span>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className={`py-24 px-10 border-t ${isDark ? "border-white/5 bg-[#050505]" : "border-slate-200 bg-white"}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <span className="text-4xl font-black tracking-tighter uppercase italic">Neva.</span>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-20 mt-4 leading-loose">Superior Safety Technologies — Global Distribution</p>
          </div>
          <div className="flex space-x-8 text-[10px] font-black tracking-[0.3em] opacity-40 uppercase">
             <a href="#" className="hover:text-blue-600 transition">LinkedIn</a>
             <a href="#" className="hover:text-blue-600 transition">Catalog</a>
             <a href="#" className="hover:text-blue-600 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}