export default class Vendeg {
    #vendegAzonosito: number;
    #reszlegAzonosito: number;
    #belépett: number;
    #ora: number;
    #perc: number;
    #masodperc: number;

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this.#vendegAzonosito = parseInt(m[0]);
        this.#reszlegAzonosito = parseInt(m[1]);
        this.#belépett = parseInt(m[2]);
        this.#ora = parseInt(m[3]);
        this.#perc = parseInt(m[4]);
        this.#masodperc = parseInt(m[5]);
    }

    public get Ora(): number {
        return this.#ora;
    }

    public get Perc(): number {
        return this.#perc;
    }

    public get Masodperc(): number {
        return this.#masodperc;
    }

    public get ReszlegAzonosito(): number {
        return this.#reszlegAzonosito;
    }

    public get Belepett(): number {
        return this.#belépett;
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
