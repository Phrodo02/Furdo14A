import Vendegek from "./Vendegek";
import fs from "fs";

export default class Megoldas {
    #vendegek: Vendegek[] = [];

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim();
                this.#vendegek.push(new Vendegek(aktSor));
            });
    }
}
