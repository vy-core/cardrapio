"use client";

import { useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

type CheckoutStep = "cart" | "checkout" | "success";

export function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore((s) => s.totalPrice());

  const [step, setStep] = useState<CheckoutStep>("cart");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "pix" as "pix" | "card" | "cash",
    change: "",
  });

  const handleClose = () => {
    closeCart();
    setTimeout(() => {
      // Reset after animation
      if (step === "success") {
        clearCart();
        setStep("cart");
      }
    }, 300);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate WhatsApp text
    let text = `*Novo Pedido Açaí & Cia* 🟣\n\n`;
    text += `*Cliente:* ${formData.name}\n`;
    text += `*Telefone:* ${formData.phone}\n`;
    text += `*Endereço:* ${formData.address}\n\n`;

    text += `*Itens do Pedido:*\n`;
    items.forEach((item) => {
      text += `- ${item.quantity}x ${item.product.name} (${formatPrice(item.product.price * item.quantity)})\n`;
    });

    text += `\n*Total:* ${formatPrice(totalPrice)}\n`;
    text += `*Pagamento:* ${formData.payment === 'pix' ? 'Pix' : formData.payment === 'card' ? 'Cartão' : 'Dinheiro'}\n`;
    if (formData.payment === "cash" && formData.change) {
      text += `*Troco para:* ${formData.change}\n`;
    }

    const encodedText = encodeURIComponent(text);
    const phone = "5531989820947"; // Replace with real number later
    window.open(`https://wa.me/${phone}?text=${encodedText}`, "_blank");

    setStep("success");
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay animate-fade-in" onClick={handleClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl animate-slide-in">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-600" />
            <span className="font-sans font-bold text-gray-900 text-[17px]">
              {step === "cart" ? "Seu carrinho" : step === "checkout" ? "Finalizar pedido" : "Pedido confirmado"}
            </span>
          </div>
          <button onClick={handleClose} className="p-2 -mr-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Box */}
        <div className="flex-1 overflow-y-auto w-full bg-brand-50/30">
          {step === "cart" && (
            <div className="px-4 py-4 flex flex-col gap-3 h-full">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center py-16">
                  <div className="text-6xl mb-2">🛒</div>
                  <p className="font-bold text-gray-800 text-lg">Carrinho vazio</p>
                  <p className="text-[14px] text-gray-500 max-w-[240px]">Adicione aquele açaí no capricho para continuar.</p>
                  <button onClick={handleClose} className="mt-4 bg-brand-100 text-brand-700 hover:bg-brand-200 font-semibold px-6 py-2.5 rounded-full transition-colors">
                    Ver cardápio
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-brand-100/60 shadow-sm">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center text-2xl flex-shrink-0">
                      {item.product.image_url ? (
                        <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        item.product.category === "cat-1" ? "🟣" : item.product.category === "cat-2" ? "🍦" : item.product.category === "cat-3" ? "🍧" : item.product.category === "cat-4" ? "🥤" : "🍫"
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="font-semibold text-gray-900 leading-tight">{item.product.name}</p>
                      <p className="text-[14px] text-brand-600 font-bold mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                      <div className="flex items-center gap-1.5 mt-3">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-[15px] font-bold text-gray-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center hover:bg-brand-700 transition-colors text-white">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => removeItem(item.product.id)} className="ml-auto p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex-shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {step === "checkout" && (
            <div className="p-5">
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-800">Seu Nome</label>
                  <input required placeholder="Como podemos te chamar?" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all text-[15px]" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-800">Telefone / WhatsApp</label>
                  <input required type="tel" placeholder="(11) 90000-0000" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all text-[15px]" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-800">Endereço de Entrega</label>
                  <textarea required rows={2} placeholder="Rua, número, complemento e bairro" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all text-[15px] resize-none" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>

                <div className="space-y-3 pt-3 border-t border-brand-100">
                  <label className="text-sm font-bold text-gray-800">Forma de Pagamento (Na entrega)</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["pix", "card", "cash"].map((method) => (
                      <label key={method} className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.payment === method ? 'border-brand-600 bg-brand-50 text-brand-800' : 'border-gray-100 bg-white hover:border-brand-200 text-gray-600'}`}>
                        <input type="radio" name="payment" className="hidden" checked={formData.payment === method} onChange={() => setFormData({ ...formData, payment: method as any })} />
                        <span className="text-[20px] mb-1">{method === "pix" ? "📱" : method === "card" ? "💳" : "💵"}</span>
                        <span className="text-xs font-bold">{method === "pix" ? "Pix" : method === "card" ? "Cartão" : "Dinheiro"}</span>
                      </label>
                    ))}
                  </div>

                  {formData.payment === "cash" && (
                    <div className="animate-slide-in mt-2 space-y-1.5">
                      <label className="text-sm font-semibold text-gray-600">Troco para quanto?</label>
                      <input placeholder="Ex: 50,00 (Deixe em branco se não precisar)" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-brand-500 transition-all text-[15px]" value={formData.change} onChange={(e) => setFormData({ ...formData, change: e.target.value })} />
                    </div>
                  )}
                </div>
              </form>
            </div>
          )}

          {step === "success" && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 h-full animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pedido Recebido!</h2>
              <p className="text-[15px] text-gray-600 mb-6">
                Seu açaí já está sendo preparado com muito carinho. O motoboy chegará em breve!
              </p>
              <div className="bg-white p-4 rounded-xl border border-gray-100 w-full mb-8 shadow-sm">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Código do Pedido</p>
                <p className="text-xl font-mono font-bold text-brand-700">AC-9921</p>
              </div>
              <button onClick={handleClose} className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md">
                Acompanhar (fechar)
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && step !== "success" && (
          <div className="border-t border-brand-100 px-5 py-5 flex flex-col gap-4 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-medium text-gray-600">Total do pedido</span>
              <span className="font-sans font-bold text-gray-900 text-[22px]">
                {formatPrice(totalPrice)}
              </span>
            </div>

            {step === "cart" ? (
              <button onClick={() => setStep("checkout")} className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-[16px]">
                Avançar
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button type="button" onClick={() => setStep("cart")} className="px-4 py-3.5 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors">
                  Voltar
                </button>
                <button type="submit" form="checkout-form" className="flex-1 flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-[16px]">
                  Confirmar Pedido
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
