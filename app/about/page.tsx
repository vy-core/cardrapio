import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <div
                className="absolute -z-50 inset-0 object-cover w-full h-full opacity-15 parallax"
            />
            <nav className="fixed z-50 top-0 left-0 w-full p-4 flex justify-between items-center">
                <div className="text-xl text-brand-600 font-bold bg-secondary px-4 py-2 rounded-lg select-none hover:bg-secondary/50 transition-colors duration-300">
                    <h1>
                        <p>Açaí & Cia</p>
                    </h1>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex justify-center gap-2">
                    <Link href={"#"} className="px-4 py-2 rounded border transition-colors duration-300">Início</Link>
                    <Link href={"#locais"} className="px-4 py-2 rounded border transition-colors duration-300">Locais</Link>
                    <Link href={"#contatos"} className="px-4 py-2 rounded border transition-colors duration-300">Contatos</Link>
                    <Link href={"/"} className="px-4 py-2 rounded border transition-colors duration-300">Cardápio</Link>
                </div>
                <div className="hidden md:flex justify-end">
                    <Link href={"/login"} className="px-4 py-2 rounded border transition-colors duration-300">Login</Link>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center">
                    <Sheet>
                        <SheetTrigger>
                            <Menu className="h-6 w-6" />
                        </SheetTrigger>
                        <SheetContent side="top" className="flex flex-col gap-4 px-4 pb-4 w-full">
                            <SheetHeader>
                                <SheetTitle className={"font-serif text-2xl text-brand-800 border-b w-2/5"}>Menu</SheetTitle>
                            </SheetHeader>
                            <a href={"#"} className="mx-4 py-2 rounded-full border text-center">Início</a>
                            <a href={"#locais"} className="mx-4 py-2 rounded-full border text-center">Locais</a>
                            <a href={"#contatos"} className="mx-4 py-2 rounded-full border text-center">Contatos</a>
                            <a href={"/"} className="mx-4 py-2 bg-primary rounded-full text-black font-semibold text-center">Cardápio</a>
                            <Link href={"/login"} className="mx-4 py-2 bg-brand-300 rounded-full font-semibold text-center">Login</Link>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
            <MainSection />
            {/* <BlurFade inView delay={0.25}>
                <LocaisSection />
            </BlurFade>
            <BlurFade inView delay={0.25}>
                <ContactSection />
            </BlurFade> */}
            <Footer />
        </main >
    );
}

function MainSection() {
    return (
        <section id="home" className="flex text-center h-screen w-full items-center justify-center">
            <div className="font-bold">
                <h1 className="my-2 xl:text-8xl text-6xl text-brand-800">
                    Açaí & Cia
                </h1>
                <Separator className="my-2 h-0.5 xl:w-xl w-xs mx-auto rounded-full" />
                <h2 className="text-2xl xl:text-4xl text-violet-600">
                    Qualidade e Sabor
                </h2>
                <Link href={"/"}>
                    <Button className="mt-16">
                        {"Venha conhecer nossos produtos!"}
                    </Button>
                </Link>
            </div>

        </section>
    );
}

function Footer() {
    return (
        <footer className="w-full border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Açaí & Cia</h3>
                        <p className="text-sm text-muted-foreground">
                            O melhor açaí e sorvetes da região com entrega rápida e qualidade garantida.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Início</a></li>
                            <li><a href="#locais" className="text-sm text-muted-foreground hover:text-primary transition-colors">Locais</a></li>
                            <li><a href="#contatos" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contatos</a></li>
                            <li><a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cardápio</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contato</h3>
                        <ul className="space-y-2">
                            <li className="text-sm text-muted-foreground">WhatsApp: (11) 99999-9999</li>
                            <li className="text-sm text-muted-foreground">Email: [EMAIL_ADDRESS]</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Açaí & Cia. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>

    );
}