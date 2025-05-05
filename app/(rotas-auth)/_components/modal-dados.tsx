/** @format */

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { ICadastro } from '@/types/bi';
import { Eye } from 'lucide-react';

export default function ModalDados({
	cadastro,
}: {
	cadastro: Partial<ICadastro>;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={'icon'}
					variant={'outline'}
					className={`bg-primary hover:bg-primary hover:opacity-70 group transition-all ease-linear duration-200`}>
                    <Eye
                        size={28}
                        className='text-white group'
                    />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Dados de SQL</DialogTitle>
					<DialogDescription>
					</DialogDescription>
				</DialogHeader>
                {cadastro.Assunto?.CodigoPedido && <div className='grid grid-cols-2 border-b-1'>
                    <div className='font-bold'>Cód. Pedido</div>
                    <div className='text-right'>{cadastro.Assunto?.CodigoPedido}</div>
                </div>}
                {cadastro.Assunto?.AssuntoCod && <div className='grid grid-cols-2 border-b-1'>
                    <div className='font-bold'>Cód. Assunto</div>
                    <div className='text-right'>{cadastro.Assunto?.AssuntoCod}</div>
                </div>}
                {cadastro.Assunto?.Assunto && <div className='grid grid-cols-2 border-b-1'>
                    <div className='font-bold'>Assunto</div>
                    <div className='text-right'>{cadastro.Assunto?.Assunto}</div>
                </div>}
                {cadastro.Assunto?.Aditivo && <div className='grid grid-cols-2 border-b-1'>
                    <div className='font-bold'>Aditivo</div>
                    <div className='text-right'>{cadastro.Assunto?.Aditivo}</div>
                </div>}
                {cadastro.Assunto?.GrupoSituacaoAssunto && <div className='grid grid-cols-2 border-b-1'>
                    <div className='font-bold'>Grupo Situação</div>
                    <div className='text-right'>{cadastro.Assunto?.GrupoSituacaoAssunto}</div>
                </div>}
                {cadastro.Assunto?.SituacaoAssunto && <div className='grid grid-cols-2 border-b-1'>
                    <div className='font-bold'>Situação</div>
                    <div className='text-right'>{cadastro.Assunto?.SituacaoAssunto}</div>
                </div>}
                {cadastro.Assunto?.NumDocumento && <div className='grid grid-cols-2 border-b-1'>
                    <div className='font-bold'>Num. Documento</div>
                    <div className='text-right'>{cadastro.Assunto?.NumDocumento}</div>
                </div>}
                {cadastro.Assunto?.NumDocIrregularidade && <div className='grid grid-cols-2 border-b-1'>
                    <div className='font-bold'>Num. Documento Irregularidade</div>
                    <div className='text-right'>{cadastro.Assunto?.NumDocIrregularidade}</div>
                </div>}
                {cadastro.Assunto?.DtEmissaoDocumento && <div className='grid grid-cols-2 border-b-1'>
                    <div className='font-bold'>Data de Emissão</div>
                    <div className='text-right'>{new Date(cadastro.Assunto?.DtEmissaoDocumento).toLocaleDateString()}</div>
                </div>}
                {cadastro.Assunto?.GrupoStatusDocumento && <div className='grid grid-cols-2 border-b-1'>
                    <div className='font-bold'>Grupo Status do Documento</div>
                    <div className='text-right'>{cadastro.Assunto?.GrupoStatusDocumento}</div>
                </div>}
                {cadastro.Assunto?.StatusDocumento && <div className='grid grid-cols-2 border-b-1'>
                    <div className='font-bold'>Status do documento</div>
                    <div className='text-right'>{cadastro.Assunto?.StatusDocumento}</div>
                </div>}
                {cadastro.Assunto?.Subprefeitura && <div className='grid grid-cols-2 border-b-1'>
                    <div className='font-bold'>Subprefeitura</div>
                    <div className='text-right'>{cadastro.Assunto?.Subprefeitura}</div>
                </div>}
                {cadastro.Assunto?.Distrito && <div className='grid grid-cols-2 border-b-1'>
                    <div className='font-bold'>Distrito</div>
                    <div className='text-right'>{cadastro.Assunto?.Distrito}</div>
                </div>}
			</DialogContent>
		</Dialog>
	);
}
