import { ReflexaoTabela } from "../utils/ReflexaoTabela";

/**
 * Classe base equivalente à SuperTabela<TypePK> do projeto Java.
 * O generic TypePK ajuda apenas durante a compilação; ele não existe em
 * runtime, por isso a leitura da chave continua dependendo da reflexão.
 */
export abstract class SuperTabela<TypePK> {
    public getPkName(): string {
        return ReflexaoTabela.getPkName(this);
    }

    public getPk(): TypePK {
        return ReflexaoTabela.getPkValue(this) as TypePK;
    }

    public setPk(valor: TypePK): void {
        ReflexaoTabela.setPkValue(this, valor);
    }

    //o método deixa de ser abstrato, ou seja, as classe não precisam implementar este método
    //os nome da classe agora serão acessados via reflexão.
    public getTableName(): string {
        return ReflexaoTabela.getTableName(this)
    };

    public isCamposObrigatoriosPreenchidos(): boolean {
        return ReflexaoTabela.isCamposObrigatoriosPreenchidos(this);
    }
}

