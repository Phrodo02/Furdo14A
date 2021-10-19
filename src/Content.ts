import fs from "fs"; //  https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; //  https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; //  https://nodejs.org/docs/latest-v14.x/api/url.html
import Megoldas from "./Megoldas";
import Vendeg from "./Vendeg";

export default class Content {
    public static content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<meta charset='utf-8'>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Fürdők</title>");
        res.write("</head>");
        res.write("<body><form><pre>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

        // Kezd a kódolást innen -->
        let megoldas: Megoldas;
        try {
            megoldas = new Megoldas("furdoadat.txt");
        } catch (error) {
            res.write("Hiba a forrásban!\n");
            res.write(`Hibaüzenet: ${(error as Error).message}\n`);
            res.write("</pre></form></body></html>");
            res.end();
            return;
        }

        res.write("2. feladat\n");
        res.write(`Az első vendég ${megoldas.ElsoKilepo}-kor lépett ki az öltözőből.\n`);
        res.write(`Az utolsó vendég ${megoldas.UtolsoKilepo}-kor lépett ki az öltözőből.\n`);

        res.write("3. feladat\n");
        res.write(`A fürdőben ${megoldas.vendegRészlegLista} vendég járt csak egy részlegen.\n`);


        res.write("4. feladat\n");
        res.write("A legtöbb időt eltöltő vendég:\n");
        res.write(`A fürdőben ${megoldas.eltoltottIdo}\n`);

        res.write("5. feladat\n");
        res.write(`6 - 9 óra között ${megoldas.intervallumKözöttLátogatók(6, 9)} vendég\n`);
        res.write(`9 - 16 óra között ${megoldas.intervallumKözöttLátogatók(9, 16)} vendég\n`);
        res.write(`16 - 20 óra között ${megoldas.intervallumKözöttLátogatók(16, 20)} vendég\n`);

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
