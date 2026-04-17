import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getGrupos } from "@/lib/api";
import { Grupo } from "@/types";
import { useEffect, useState } from "react";
import GrupoDialog from "../dialogs/group-dialog";
import { formatPrice } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Loader2, PackageOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";


export default function GruposView() {
    const [gruposAd, setGruposAd] = useState<Grupo[] | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<Grupo | null>(null);
    const [form, setForm] = useState({
        name: "",
        description: "",
        image_url: ""
    });

    useEffect(() => {
        getGrupos().then((data) => {
            setGruposAd(data);
            setLoading(false);
        }).catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    return (
        <div className="relative min-h-[400px]">
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 flex items-center justify-center bg-black/5 backdrop-blur-md"
                    >
                        <div className="flex flex-col items-center gap-4 p-12 rounded-3xl bg-white/60 border border-white shadow-2xl">
                            <div className="relative">
                                <div className="absolute inset-0 blur-2xl bg-brand-600/30 rounded-full animate-pulse" />
                                <Loader2 className="h-12 w-12 animate-spin text-brand-600 relative z-10" />
                            </div>
                            <p className="text-xl font-bold text-brand-900 tracking-tight">Buscando grupos...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gruposAd && gruposAd.length > 0 ? (
                    gruposAd.map((grupo, i) => (
                        <BlurFade key={grupo.id} delay={0.1 * i}>
                            <Card className="px-4 bg-brand-50 border-brand-100/50 shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="font-bold text-xl text-brand-900">{grupo.nome}</CardTitle>
                                    <GrupoDialog triggerName="Editar" grupo={grupo} />
                                </CardHeader>
                                <Card className="gap-2 border-brand-100 bg-white/50 p-2">
                                    {grupo.adicionais.map((adicional) => (
                                        <div key={adicional.id} className="flex justify-center w-full mb-2 last:mb-0">
                                            <div className="flex justify-around border rounded-full border-brand-900/20 bg-brand-50 items-center gap-2 px-4 py-2 w-full">
                                                <p className="font-medium text-brand-900">{adicional.nome}</p>
                                                <p className="text-brand-700">{formatPrice(adicional.preco)}</p>
                                                <p className={adicional.disponivel ? "text-green-600 font-semibold" : "text-red-500 font-semibold text-xs opacity-70"}>
                                                    {adicional.disponivel ? "Disponível" : "Indisponível"}</p>
                                            </div>
                                        </div>
                                    ))}
                                </Card>
                            </Card>
                        </BlurFade>
                    ))
                ) : !loading && (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 px-4">
                        <BlurFade delay={0.1}
                            className="max-w-md w-full bg-white rounded-3xl p-10 border border-brand-100 shadow-xl shadow-brand-500/5 text-center"
                        >
                            <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <PackageOpen className="w-12 h-12 text-brand-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-brand-900 mb-2">Nenhum grupo cadastrado</h3>
                            <p className="text-brand-500 mb-8 leading-relaxed">
                                Parece que você ainda não tem grupos de adicionais. Crie seu primeiro grupo para começar a personalizar seu cardápio!
                            </p>
                            <div className="flex justify-center">
                                <GrupoDialog triggerName="Adicionar Meu Primeiro Grupo" />
                            </div>
                        </BlurFade>
                    </div>
                )}
            </div>
        </div>
    );
}