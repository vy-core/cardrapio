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


export default function GruposView() {
    const [gruposAd, setGruposAd] = useState<Grupo[]>([]);
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
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gruposAd.map((grupo) => (
                    <Card key={grupo.id} className="px-4 bg-brand-50">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="font-bold text-xl">{grupo.nome}</CardTitle>
                            <GrupoDialog triggerName="Editar" grupo={grupo} />

                        </CardHeader>
                        <Card>
                            {grupo.adicionais.map((adicional) => (
                                <div className="flex justify-center w-full">
                                    <div key={adicional.id} className="flex justify-around items-center gap-2 px-4 border-b pb-2 w-11/12">
                                        <p>{adicional.nome}</p>
                                        <p>{formatPrice(adicional.preco)}</p>
                                        <p className={adicional.disponivel ? "text-green-500" : "text-red-500"}>
                                            {adicional.disponivel ? "Disponível" : "Indisponível"}</p>
                                    </div>
                                </div>
                            ))}
                        </Card>
                    </Card>
                ))}
            </div>
        </div>
    );
}