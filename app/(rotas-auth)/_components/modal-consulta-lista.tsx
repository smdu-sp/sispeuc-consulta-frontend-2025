/** @format */

'use client'

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { buscarLista } from '@/services/cadastros';
import { IListaSql } from '@/types/bi';
import { CloudUpload, Download, Loader2, Upload } from 'lucide-react';
import { FormEvent, useState, useTransition } from 'react';
import { toast } from 'sonner';
import * as xlsx from 'xlsx';

export default function ModalDados() {
	const [isPending, startTransition] = useTransition();
	const [file, setFile] = useState<File | null>();
    const [listaSqlResposta, setListaSqlsResposta] = useState<IListaSql[]>([]);

    function downloadXlsxTabela(){
        const ws = xlsx.utils.json_to_sheet(listaSqlResposta);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, "Relatório");
        const dataRelatorio = new Date();
        xlsx.writeFile(wb, `${dataRelatorio.toLocaleDateString()}_${dataRelatorio.toLocaleTimeString()}_lista_processos_sqls.xlsx`);
		setFile(null);
        setListaSqlsResposta([]);
    }

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!file) return alert("Suba um arquivo válido!");
		const reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onload = async (e) => {
			if (e.target){
				const dados = e.target?.result;
				const wb = xlsx.read(dados);
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				const linhas = xlsx.utils.sheet_to_json(ws, { header: 1 });
				const sqls = linhas.slice(1).map((row: any) => row[0].split(';')[0]);
				if (sqls.length <= 0) return alert("Lista de SQL vazia.");
				const { ok, data, error, status } = await buscarLista(sqls);
				if (ok && data && !error && status === 200){
					setListaSqlsResposta(data as IListaSql[]);
				} else {
					toast.error(error || "Não foi possível consultar a lista de SQLs");
				}
			}
		};
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={'icon'}
					variant={'outline'}
					className={`bg-primary hover:bg-primary hover:opacity-70 group transition-all ease-linear duration-200`}>
                    <Upload
                        size={28}
                        className='text-white group'
                    />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Consultar Lista de SQLs</DialogTitle>
					<DialogDescription>
					</DialogDescription>
				</DialogHeader>
                <form
					onSubmit={(e) => {
						startTransition(() => handleSubmit(e));
					}}
					encType='multipart/form-data'>
					<label
						htmlFor='file'
						className='border flex p-4 rounded-lg cursor-pointer items-center justify-center gap-2 text-muted-foreground border-dashed hover:border-primary hover:text-primary transition-all ease-in-out duration-200'>
						<CloudUpload size={24} />
						{isPending ? 'Enviando...' : file ? file.name : 'Selecione o arquivo'}
					</label>
					<input
						onChange={(e) => {
							const files = e.target.files;
							if (files && files[0]) {
								setFile(files[0]);
							}
						}}
						id='file'
						type='file'
						name='arquivo'
						accept='.xlsx, .xls, .csv'
						title='Selecione o arquivo'
						className='hidden'
                        multiple={false}
					/>
                    {listaSqlResposta && listaSqlResposta.length > 0 &&
                      	<Button
					  		type="button"
							variant="link"
							onClick={downloadXlsxTabela}
							className='mt-5 w-full'
						><><Download />Baixar Relatório</></Button>
                    }
					<Button
						disabled={isPending || !file}
						type='submit'
						className='mt-5 w-full'
					>
						{isPending ? (
							<>
								Enviar <Loader2 className='animate-spin' />
							</>
						) : (
							'Enviar'
						)}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
