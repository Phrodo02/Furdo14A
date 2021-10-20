import Megoldas from "../Megoldas";
import fs from "fs";

describe("Megoldas osztály unit tesztek", () => {
    const megoldas = new Megoldas("furdoadat.txt");
    const megoldas2 = new Megoldas("furdoTest.txt");
    const megoldas3 = new Megoldas("furdoTest2.txt");

    it("Megoldás osztály páldány ellenőrzése", () => {
        expect(megoldas).toBeInstanceOf(Megoldas);
    });

    it("Eltöltött idó ellenőrzése", () => {
        expect(megoldas.eltoltottIdo).toBe("306. vendég 6:41:19");
    });

    it("Eltöltött idó ellenőrzése 2", () => {
        expect(megoldas2.eltoltottIdo).toBe("112. vendég 0:30:48");
    });

    it("szauna.txt tartalmának ellenőrzése", () => {
        expect(megoldas.szaunaEltoltottIdo).toBe("Sikeres fájlba írás");
        expect(fs.readFileSync("szauna.txt").toString()).toBe(fs.readFileSync("szaunaOH.txt").toString());
    });

    it("szauna.txt tartalmának ellenőrzése 2", () => {
        expect(megoldas2.szaunaEltoltottIdo).toBe("Sikeres fájlba írás");
        expect(fs.readFileSync("szauna.txt").toString()).toBe(fs.readFileSync("szaunaOH.txt").toString());
    });

    it("Részlegek használatának számai test", () => {
        expect(megoldas.reszlegHasználat).toBe("Uszoda: 41\nSzaunák: 52\nGyógyvizes medencék: 54\nStrand: 48");
    });

    it("Egy rszleges véndégek tesztelése", () => {
        expect(megoldas.vendegRészlegLista).toBe(33);
    });

    it("Intervallum közti látogatók", () => {
        expect(megoldas.intervallumKözöttLátogatók(6, 9)).toBe(9);
        expect(megoldas.intervallumKözöttLátogatók(9, 16)).toBe(45);
        expect(megoldas.intervallumKözöttLátogatók(16, 20)).toBe(46);
    });

    it("Elso látogató", () => {
        expect(megoldas.ElsoKilepo).toBe("6:14:56");
    });

    it("Elso látogató 2", () => {
        expect(megoldas2.ElsoKilepo).toBe("16:15:27");
    });

    it("Utolsó látogató", () => {
        expect(megoldas.UtolsoKilepo).toBe("18:35:37");
    });

    it("Utolsó látogató 2", () => {
        expect(megoldas3.UtolsoKilepo).toBe("6:17:47");
    });
});
