import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export function formatDate(dataString: string) : string {
    if (!dataString) return "";
    const date = parseISO(dataString);
    return format(date, "dd/MM/yyyy", { locale: ptBR });    
   
}

export function formatMoeda (valor: number, decimal: number = 2): string  {
    
    return parseFloat(valor.toString()).toLocaleString('pt-BR', 
        {
            currency: 'BRL', 
            minimumFractionDigits: decimal,
        }
    )
}