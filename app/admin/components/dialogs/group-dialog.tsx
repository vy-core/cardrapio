import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Adicionais, Grupo } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";


interface GrupoDialogProps {
    grupo?: Grupo;
    triggerName: string;
}
export default function GrupoDialog({ triggerName, grupo }: GrupoDialogProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [grupoNome, setGrupoNome] = useState(grupo?.nome || "");
    const [adicionais, setAdicionais] = useState<Adicionais[]>(grupo?.adicionais || []);
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="hover:cursor-pointer border border-brand-900 p-1 px-3 rounded-full hover:bg-brand-200 transition-colors">
                {triggerName}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{grupo ? grupo.nome : "Adicionar Grupo"}</DialogTitle>
                    <DialogDescription>
                        {grupo ? "Atualize os detalhes do grupo" : "Adicione um novo grupo"}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <Label className="pl-4">Nome do Grupo:</Label>
                    <Input value={grupoNome} onChange={(e) => setGrupoNome(e.target.value)}
                        placeholder="Nome do grupo" />
                </div>

                {grupo && (
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <Label className="pl-4">Adicionais:</Label>
                            <Button variant="outline">Adicionar Adicional</Button>
                        </div>
                        <Card className="px-4">
                            {grupo.adicionais.map((adicional) => (
                                <div key={adicional.id} className="flex items-center gap-2 px-4">
                                    <Input value={adicional.nome} onChange={(e) => setAdicionais(adicionais.map((a) => a.id === adicional.id ? { ...a, nome: e.target.value } : a))} />
                                    <Input type="number" value={adicional.preco} onChange={(e) => setAdicionais(adicionais.map((a) => a.id === adicional.id ? { ...a, preco: parseFloat(e.target.value) } : a))} />
                                    <Checkbox value={String(adicional.disponivel)} />
                                </div>
                            ))}
                        </Card>
                    </div>
                )}

                <div className="flex justify-end gap-2">
                    <Button variant={"outline"} onClick={() => setIsDialogOpen(false)}>Salvar</Button>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}