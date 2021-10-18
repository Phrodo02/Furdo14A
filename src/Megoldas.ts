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
                console.log(aktSor);
                this.#vendegek.push(new Vendeg(aktSor));
            });
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
