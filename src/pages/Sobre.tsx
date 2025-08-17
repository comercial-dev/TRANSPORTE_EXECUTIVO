export default function Sobre() {
		const dataAtual = new Date();
		const dataFormatada = dataAtual.toLocaleDateString('pt-BR');
		const horaFormatada = dataAtual.toLocaleTimeString('pt-BR');
			return (
				<div>
					<h1 className="text-3xl font-bold mb-6">Sobre o Aplicativo</h1>
					<p className="mb-4">
						Este painel foi desenvolvido para gestão de transporte executivo.<br/>
						<b>Versão:</b> 1.0<br/>
						<b>Criado em:</b> 08/2025<br/>
						<b>Equipe:</b> ActiveBackground
					</p>
					<p className="text-sm text-muted-foreground">
						Última atualização: {dataFormatada} às {horaFormatada}
					</p>
				</div>
			);
}
