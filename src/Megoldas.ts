import Vendeg from "./Vendeg";
import fs from "fs";

export default class Megoldas {
    #vendegek: Vendeg[] = [];

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim();
                this.#vendegek.push(new Vendeg(aktSor));
            });
    }

    public get eltoltottIdo(): string {
        let ki = 0;
        let be = 0;
        let azon = 0;
        let max = 0;
        let maxAzon = 0;
        for (const vendeg of this.#vendegek) {
            if (vendeg.ReszlegAzonosito == 0) {
                if (vendeg.VendegAzon == azon) {
                    if (vendeg.Belepett != 1) {
                        ki = new Date(2021, 10, 10, vendeg.Ora, vendeg.Perc, vendeg.Masodperc).getTime();
                    }
                    if (ki != 0 && be != 0 && max < ki - be) {
                        max = ki - be;
                        maxAzon = vendeg.VendegAzon;
                    }
                } else {
                    be = new Date(2021, 10, 10, vendeg.Ora, vendeg.Perc, vendeg.Masodperc).getTime();
                    azon = vendeg.VendegAzon;
                }
            }
        }
        const date = max.toString();
        const d = new Date(parseInt(date, 10));
        return `${maxAzon}. vendég ${d.getHours() - 1}:${d.getMinutes()}:${d.getSeconds()}`;
    }

    public get vendegRészlegLista(): number {
        let tmpAzon = 0;
        let szamlalo = 0;
        let egyReszlegesVendeg = 0;
        for (const vendeg of this.#vendegek) {
            if (tmpAzon == vendeg.VendegAzon) {
                szamlalo++;
            } else {
                if (szamlalo == 4) {
                    szamlalo = 0;
                    egyReszlegesVendeg++;
                } else szamlalo = 0;
                tmpAzon = vendeg.VendegAzon;
                szamlalo++;
            }
        }
        return egyReszlegesVendeg;
    }

    public get ElsoKilepo(): string {
        let Min = 240001;
        for (const vendeg of this.#vendegek) {
            if (vendeg.ReszlegAzonosito == 0 && vendeg.Belepett == 1) {
                if (vendeg.osszeFuzottOra < Min) {
                    Min = vendeg.osszeFuzottOra;
                }
            }
        }
        const tmpTime = Min.toString();
        let returnedTime: string;
        tmpTime.length == 5 ? (returnedTime = tmpTime[0] + ":" + tmpTime[1] + tmpTime[2] + ":" + tmpTime[3] + tmpTime[4]) : (returnedTime = tmpTime[0] + tmpTime[1] + ":" + tmpTime[2] + tmpTime[3] + ":" + tmpTime[4] + tmpTime[5]);
        return returnedTime;
    }

    public get UtolsoKilepo(): string {
        let Max = 0;
        for (const vendeg of this.#vendegek) {
            if (vendeg.ReszlegAzonosito == 0 && vendeg.Belepett == 1) {
                if (vendeg.osszeFuzottOra > Max) {
                    Max = vendeg.osszeFuzottOra;
                }
            }
        }
        const tmpTime = Max.toString();
        let returnedTime: string;
        tmpTime.length == 5 ? (returnedTime = tmpTime[0] + ":" + tmpTime[1] + tmpTime[2] + ":" + tmpTime[3] + tmpTime[4]) : (returnedTime = tmpTime[0] + tmpTime[1] + ":" + tmpTime[2] + tmpTime[3] + ":" + tmpTime[4] + tmpTime[5]);
        return returnedTime;
    }
}
