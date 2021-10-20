export default class Vendeg {
    #vendegAzonosito: number;
    #reszlegAzonosito: number;
    #belepett: number;
    #ora: number;
    #perc: number;
    #masodperc: number;

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this.#vendegAzonosito = parseInt(m[0]);
        this.#reszlegAzonosito = parseInt(m[1]);
        this.#belepett = parseInt(m[2]);
        this.#ora = parseInt(m[3]);
        this.#perc = parseInt(m[4]);
        this.#masodperc = parseInt(m[5]);
    }

    public get vendegAzon(): number {
        return this.#vendegAzonosito;
    }

    public get ora(): number {
        return this.#ora;
    }

    public get perc(): number {
        return this.#perc;
    }

    public get masodperc(): number {
        return this.#masodperc;
    }

    public get reszlegAzon(): number {
        return this.#reszlegAzonosito;
    }

    public get belepett(): number {
        return this.#belepett;
    }
    public get osszeFuzottOra(): number {
        let tmpPerc: string;
        let tmpMasodperc: string;
        if (this.#perc < 10) tmpPerc = "0" + this.#perc;
        else tmpPerc = this.#perc.toString();
        if (this.#masodperc < 10) tmpMasodperc = "0" + this.#masodperc;
        else tmpMasodperc = this.#masodperc.toString();
        return parseInt(this.#ora + tmpPerc + tmpMasodperc);
    }
}
