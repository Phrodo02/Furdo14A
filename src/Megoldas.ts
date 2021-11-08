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

    public fajlBeolvasas(fajlnev: string): string {
        try {
            return fs.readFileSync(fajlnev).toString();
        } catch (error) {
            console.log((error as Error).message);
            return "Hibás fájlbeolvasás";
        }
    }

    public get eltoltottIdo(): string {
        let ki = 0;
        let be = 0;
        let azon = 0;
        let max = 0;
        let maxAzon = 0;
        for (const vendeg of this.#vendegek) {
            if (vendeg.reszlegAzon == 0) {
                if (vendeg.vendegAzon == azon) {
                    if (vendeg.belepett != 1) {
                        ki = new Date(2021, 10, 10, vendeg.ora, vendeg.perc, vendeg.masodperc).getTime();
                    }
                    if (ki != 0 && be != 0 && max < ki - be) {
                        max = ki - be;
                        maxAzon = vendeg.vendegAzon;
                    }
                } else {
                    be = new Date(2021, 10, 10, vendeg.ora, vendeg.perc, vendeg.masodperc).getTime();
                    azon = vendeg.vendegAzon;
                }
            }
        }
        const date = max.toString();
        const d = new Date(parseInt(date, 10));
        return `${maxAzon}. vendég ${d.getHours() - 1}:${d.getMinutes()}:${d.getSeconds()}`;
    }

    public szaunaEltoltottIdo(fajlnev: string): void {
        let ki = 0;
        let be = 0;
        let azon = 0;
        const fajlba = [];
        let osszIdo = 0;
        for (const vendeg of this.#vendegek) {
            if (vendeg.vendegAzon == azon) {
                if (vendeg.reszlegAzon == 2) {
                    if (vendeg.belepett != 1) {
                        be = new Date(2021, 10, 10, vendeg.ora, vendeg.perc, vendeg.masodperc).getTime();
                    } else {
                        ki = new Date(2021, 10, 10, vendeg.ora, vendeg.perc, vendeg.masodperc).getTime();
                        osszIdo += ki - be;
                    }
                }
            } else {
                if (osszIdo != 0) {
                    const date = osszIdo.toString();
                    const tmpIdo = new Date(parseInt(date, 10));
                    fajlba.push(`${azon} ${tmpIdo.getHours() - 1 < 10 ? "0" + (tmpIdo.getHours() - 1) : tmpIdo.getHours() - 1}:${tmpIdo.getMinutes() < 10 ? "0" + tmpIdo.getMinutes() : tmpIdo.getMinutes()}:${tmpIdo.getSeconds() < 10 ? "0" + tmpIdo.getSeconds() : tmpIdo.getSeconds()}\r\n`);
                    osszIdo = 0;
                }
                azon = vendeg.vendegAzon;
            }
        }
        try {
            fs.writeFileSync(fajlnev, fajlba.join(""));
        } catch (error) {
            console.log((error as Error).message);
        }
    }

    public get reszlegHasznalat(): string {
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
            if (vendeg.vendegAzon == azon) {
                switch (vendeg.reszlegAzon) {
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
                azon = vendeg.vendegAzon;
                v1 = false;
                v2 = false;
                v3 = false;
                v4 = false;
            }
        }
        return `Uszoda: ${uszoda}\nSzaunák: ${szauna}\nGyógyvizes medencék: ${gyogyviz}\nStrand: ${strand}`;
    }

    public get vendegReszlegLista(): number {
        let tmpAzon = 0;
        let szamlalo = 0;
        let egyReszlegesVendeg = 0;
        for (const vendeg of this.#vendegek) {
            if (tmpAzon == vendeg.vendegAzon) {
                szamlalo++;
            } else {
                if (szamlalo == 4) {
                    szamlalo = 0;
                    egyReszlegesVendeg++;
                } else szamlalo = 0;
                tmpAzon = vendeg.vendegAzon;
                szamlalo++;
            }
        }
        return egyReszlegesVendeg;
    }

    public intervallumKozottLatogatok(kezdes: number, vege: number): number {
        let szamlalo = 0;
        const tmpVendegekAzon = [];
        for (const vendeg of this.#vendegek) {
            if (vendeg.ora >= kezdes && vendeg.ora < vege && vendeg.reszlegAzon == 0 && vendeg.belepett == 1) {
                tmpVendegekAzon.push(vendeg.vendegAzon);
                szamlalo++;
            }
        }
        return szamlalo;
    }

    public get elsoKilepo(): string {
        let Min = 240001;
        for (const vendeg of this.#vendegek) {
            if (vendeg.reszlegAzon == 0 && vendeg.belepett == 1) {
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

    public get utolsoKilepo(): string {
        let Max = 0;
        for (const vendeg of this.#vendegek) {
            if (vendeg.reszlegAzon == 0 && vendeg.belepett == 1) {
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
