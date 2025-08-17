import { useState, useCallback } from "react";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface DataUploadProps {
  onDataUploaded: (data: any[]) => void;
}

export const DataUpload = ({ onDataUploaded }: DataUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const processCSVData = (csvText: string) => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) throw new Error('Arquivo deve conter pelo menos uma linha de dados');

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      if (values.length !== headers.length) continue;

      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });
      data.push(row);
    }

    return data;
  };

  const handleFile = async (file: File) => {
    try {
      if (!file.name.endsWith('.csv')) {
        throw new Error('Por favor, selecione um arquivo CSV');
      }

      const text = await file.text();
      const data = processCSVData(text);
      
      onDataUploaded(data);
      setUploadStatus('success');
      
      toast({
        title: "Sucesso!",
        description: `${data.length} registros carregados com sucesso.`,
      });
    } catch (error) {
      setUploadStatus('error');
      toast({
        title: "Erro no upload",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5" />
          Upload de Dados
        </CardTitle>
        <CardDescription>
          Faça upload de um arquivo CSV com os dados das corridas para gerar o dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">
            Arraste seu arquivo CSV aqui
          </h3>
          <p className="text-muted-foreground mb-4">
            ou clique no botão abaixo para selecionar
          </p>
          
          <input
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="hidden"
            id="csv-upload"
          />
          <label htmlFor="csv-upload">
            <Button variant="outline" className="cursor-pointer">
              Selecionar Arquivo CSV
            </Button>
          </label>
        </div>

        {uploadStatus === 'success' && (
          <Alert className="mt-4 border-status-success bg-status-success/5">
            <CheckCircle className="h-4 w-4 text-status-success" />
            <AlertDescription className="text-status-success">
              Dados carregados com sucesso! O dashboard foi atualizado.
            </AlertDescription>
          </Alert>
        )}

        {uploadStatus === 'error' && (
          <Alert className="mt-4 border-status-error bg-status-error/5">
            <AlertCircle className="h-4 w-4 text-status-error" />
            <AlertDescription className="text-status-error">
              Erro ao carregar os dados. Verifique o formato do arquivo.
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-4 text-sm text-muted-foreground">
          <h4 className="font-medium mb-2">Formato esperado do CSV:</h4>
          <p className="text-xs">
            Código Corrida, Data/Hora da Corrida, Motorista, Passageiro, Origem, Destino, 
            Distância (km), Duração (min), Valor Corrida, Forma de Pagamento, Status, Empresa Cliente
          </p>
        </div>
      </CardContent>
    </Card>
  );
};