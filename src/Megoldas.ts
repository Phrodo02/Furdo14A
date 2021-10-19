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

    public get szaunaEltoltottIdo(): string {
        let ki = 0;
        let be = 0;
        let azon = 0;
        const fajlba = [];
        for (const vendeg of this.#vendegek) {
            if (vendeg.ReszlegAzonosito == 2 && vendeg.VendegAzon == azon) {
                if (vendeg.Belepett != 1) {
                    be = new Date(2021, 10, 10, vendeg.Ora, vendeg.Perc, vendeg.Masodperc).getTime();
                } else {
                    ki = new Date(2021, 10, 10, vendeg.Ora, vendeg.Perc, vendeg.Masodperc).getTime();
                    const date = (ki - be).toString();
                    const d = new Date(parseInt(date, 10));
                    fajlba.push(`${vendeg.VendegAzon} ${d.getHours() - 1 < 10 ? "0" + (d.getHours() - 1) : d.getHours() - 1}:${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}:${d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds()}`);
                }
            } else {
                azon = vendeg.VendegAzon;
            }
        }
        fs.writeFileSync("szauna.txt", fajlba.join("\n"));
        return "";
    }
    public get reszlegHasználat(): string {
        let uszoda = 0;
        let szauna = 0;
        let gyogyviz = 0;
        let strand = 0;
        let azon = 0;
        let v1 = false;
        let v2 = false;
        let v3 = false;
        let v4 = false;
        for (const vendeg of this.#vendegek) {
            if (vendeg.VendegAzon == azon) {
                switch (vendeg.ReszlegAzonosito) {
                    case 1:
                        if (!v1) uszoda++;
                        v1 = true;
                        break;
                    case 2:
                        if (!v2) szauna++;
                        v2 = true;
                        break;
                    case 3:
                        if (!v3) gyogyviz++;
                        v3 = true;
                        break;
                    case 4:
                        if (!v4) strand++;
                        v4 = true;
                        break;
                    default:
                        break;
                }
            } else {
                azon = vendeg.VendegAzon;
                v1 = false;
                v2 = false;
                v3 = false;
                v4 = false;
            }
        }
        return `Uszoda ${uszoda}\nSzaunák: ${szauna}\nGyógyvizes medencék: ${gyogyviz}\nStrand: ${strand}`;
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

    public intervallumKözöttLátogatók(kezdes: number, vege: number): number {
        let szamlalo = 0;
        const tmpVendegekAzon = [];
        for (const vendeg of this.#vendegek) {
            if (vendeg.Ora >= kezdes && vendeg.Ora < vege && vendeg.ReszlegAzonosito == 0 && vendeg.Belepett == 1) {
                tmpVendegekAzon.push(vendeg.VendegAzon);
                szamlalo++;
            }
        }
        return szamlalo;
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
