export default class Vendegek {
    #vendegAzonosito: number;
    #furdoAzonosito: number;
    #belépett: number;
    #ora: number;
    #perc: number;
    #masodperc: number;

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this.#vendegAzonosito = parseInt(m[0]);
        this.#furdoAzonosito = parseInt(m[1]);
        this.#belépett = parseInt(m[2]);
        this.#ora = parseInt(m[3]);
        this.#perc = parseInt(m[4]);
        this.#masodperc = parseInt(m[5]);
    }
}
