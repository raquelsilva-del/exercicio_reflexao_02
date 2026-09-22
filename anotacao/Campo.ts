import "reflect-metadata";

export const CAMPOS_METADATA_KEY = Symbol("campos");

export interface CampoOpcoes {
    colunaNome: string;
    isPk?: boolean;
    isObrigatorio?: boolean;
}

export interface CampoMetadata extends Required<CampoOpcoes> {
    propriedade: string;
}

/**
 * Equivalente TypeScript da anotação Java @Campo.
 *
 * O decorator é executado quando a classe é declarada. Nesse momento ele
 * registra os dados do campo no construtor da classe para consulta posterior. (ClassDecorator para tabela)
 */
export function Campo(opcoes: CampoOpcoes): PropertyDecorator {

    return (target, propertyKey) => {
        const construtor = target.constructor;

        if (!opcoes.colunaNome?.trim()) {
            throw new Error(`O decorator @Campo exige uma colunaNome não vazio.
Classe: ${construtor.name}\n Propriedade: ${String(propertyKey)}`);
        }

        const metadata: Omit<CampoMetadata, "propriedade"> = {
            colunaNome: opcoes.colunaNome,
            isPk: opcoes.isPk ?? false,
            isObrigatorio: opcoes.isObrigatorio ?? false,
        };


        const campos =
            (Reflect.getOwnMetadata(CAMPOS_METADATA_KEY, construtor) as Map<string, CampoMetadata> | undefined)
            ?? new Map<string, CampoMetadata>();

        campos.set(String(propertyKey), {
            ...metadata,
            propriedade: String(propertyKey),
        });

        Reflect.defineMetadata(CAMPOS_METADATA_KEY, campos, construtor);
    };
}


export const TABELA_METADATA_KEY = Symbol("tabela")
//Cria uma chave única chamada tabela para usar posteriormente.
//O Symbol és a chave usada para identificar esse metadado.
//usar um Symbol reduz o risco de colisão de nomes

export function Tabela(nomeT?: string): ClassDecorator{
    return (constructor: Function) => {
        const nomeTabela = nomeT ?? constructor.name
        Reflect.defineMetadata(TABELA_METADATA_KEY, nomeTabela, constructor)
    }
}

/* o Decorator recebe o nome da classe, que é um atributo opcional. Então, se o nome foi passado por parâmetro
define o nome da tabela, caso o nome não tenha sido passado por parâmetro o nome da classe é o nome da tabela.
O nome é definido na constante TABELA_METADATA_KEY e pode ser chamada via reflexão.
 */

/* 
defineMetadata(TABELA_METADATA_KEY, nomeTabela, constructor)
TABELA_METADATA_KEY — A key used to store and retrieve metadata.
nomeTabela — A value that contains attached metadata.
constructor — The target object on which to define metadata.
 */