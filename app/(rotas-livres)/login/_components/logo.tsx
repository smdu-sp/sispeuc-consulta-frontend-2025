'use client'

import smul_azul from "@/public/smul_azul.png"
import smul_branco from "@/public/smul_branco.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from 'react';

export default function Logo() {
    const { theme, systemTheme } = useTheme();
    const tema = theme === "system" ? systemTheme : theme;
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    if (!mounted) {
        return <img
            src={"/asdasdasdas.png"}
            alt="SMUL LOGO"
        />
    }

    return <img
        src={tema === "dark" ? smul_branco.src : smul_azul.src}
        alt="SMUL LOGO"
    />
}