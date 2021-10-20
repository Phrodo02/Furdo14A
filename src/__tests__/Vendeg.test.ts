import Vendeg from "../Vendeg";

describe("Vendég osztály unit tesztek", () => {
    const vendeg: Vendeg = new Vendeg("112 0 1 6 14 56");
    const vendeg2: Vendeg = new Vendeg("102 0 1 8 04 06");

    it("Vendég osztálypéldány ellenőrzése", async () => {
        expect(vendeg).toBeInstanceOf(Vendeg);
    });

    // it("Vendég sor ellenőrzése", async () => {
    //     expect(() => new Vendeg("111 0 1 a 14")).toThrowError("Hibás érték!");
    // });

    it("Vendégazonosító ellenőrzése:", async () => {
        expect(vendeg.vendegAzon).toBe(112);
    });

    it("Vendég részlegazonosító ellenőrzése:", async () => {
        expect(vendeg.reszlegAzon).toBe(0);
    });

    it("Vendég óra ellenőrzése:", async () => {
        expect(vendeg.ora).toBe(6);
    });

    it("Vendég perc ellenőrzése:", async () => {
        expect(vendeg.perc).toBe(14);
    });

    it("Vendég másodperc ellenőrzése:", async () => {
        expect(vendeg.masodperc).toBe(56);
    });

    it("Vendég belépett ellenőrzése:", async () => {
        expect(vendeg.belepett).toBe(1);
    });

    it("Vendég osszeFuzottOra ellenőrzése:", async () => {
        expect(vendeg.osszeFuzottOra).toBe(61456);
    });

    it("Vendég2 osszeFuzottOra ellenőrzése:", async () => {
        expect(vendeg2.osszeFuzottOra).toBe(80406);
    });
});
