import { ArrowLeft, Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-50 pb-20">
      {/* Header */}
      <header className="bg-white sticky top-0 z-10 border-b border-brand-100 p-4 flex items-center gap-3">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-brand-50 active:bg-brand-100 text-brand-700 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-display font-semibold text-lg text-brand-900">Sobre Nós</h1>
      </header>

      {/* Hero Presentation */}
      <section className="bg-brand-600 text-white p-8 text-center sm:py-16">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center text-4xl mb-4 border border-white/30 shadow-lg">
          🟣
        </div>
        <h2 className="font-display text-3xl font-bold mb-2">Açaiteria Premium</h2>
        <p className="text-brand-100 max-w-md mx-auto leading-relaxed">
          O melhor açaí da cidade, com ingredientes frescos e complementos à sua escolha. Também servimos sorvetes e taças incríveis.
        </p>
      </section>

      {/* Info Cards */}
      <main className="px-4 py-8 max-w-xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl p-5 border border-brand-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-brand-50 rounded-xl text-brand-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-medium text-brand-900 mb-1">Horário de Funcionamento</h3>
            <p className="text-sm text-gray-500">Terça a Domingo</p>
            <p className="text-sm font-medium text-brand-700">14:00 às 22:30</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-brand-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-brand-50 rounded-xl text-brand-600">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-medium text-brand-900 mb-1">Localização</h3>
            <p className="text-sm text-gray-500">Av. das Palmeiras, 1024</p>
            <p className="text-sm text-gray-500">Centro - Nossa Cidade</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-brand-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-brand-50 rounded-xl text-brand-600">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-medium text-brand-900 mb-1">Contato</h3>
            <p className="text-sm text-gray-500">(11) 98888-7777</p>
            <p className="text-sm text-brand-600 mt-1 cursor-pointer font-medium hover:underline">Chamar no WhatsApp</p>
          </div>
        </div>
      </main>
    </div>
  );
}
