'use client'

import claro from "@/public/martinelli_dia.jpg";
import escuro from "@/public/martinelli_noite.jpeg";
import { ModeToggle } from "@/components/toggle-theme";
import { useTheme } from "next-themes";
import { useEffect, useState } from 'react';

export default function Imagem() {
    const { theme, systemTheme } = useTheme();
    const tema = theme === "system" ? systemTheme : theme;
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    if (!mounted) {
        return <div className="relative hidden bg-muted md:block">
            <ModeToggle className="z-50 absolute right-2 top-2" />
        </div>
    }

    return <div className="relative hidden bg-muted md:block">
        <ModeToggle className="z-50 absolute right-2 top-2" />
        <img
            src={tema === "dark" ? escuro.src : claro.src}
            alt="Edíficio Martinelli"
            className="absolute inset-0 h-full w-full object-cover"
        />
    </div>
}