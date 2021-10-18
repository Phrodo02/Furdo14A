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
}
