export function cirilizatorDecirilizator(operacija, tekst) {
    if (!tekst) return;
    const abeceda = ['a', 'b', 'c', 'č', 'ć', 'd', 'dž', 'đ', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'lj', 'm', 'n', 'nj', 'o', 'p', 'r', 's', 'š', 't', 'u', 'v', 'z', 'ž'];
    const azbuka = ['а', 'б', 'ц', 'ч', 'ћ', 'д', 'џ', 'ђ', 'е', 'ф', 'г', 'х', 'и', 'ј', 'к', 'л', 'љ', 'м', 'н', 'њ', 'о', 'п', 'р', 'с', 'ш', 'т', 'у', 'в', 'з', 'ж'];
    function cirilizator(tekst) {
        let noviTekst = tekst.replace(/nj|lj|dž|[a-zđčćžš]/gi, function (x) {
            /* if(/[w, y, q, x]/i.test(x)) {
                return x
            } */
            let index = abeceda.indexOf(x.toLowerCase());
            if (index === -1) return x;
            return x[0] == x.toString()[0].toUpperCase() ? azbuka[index].toString().toUpperCase() : azbuka[index];
        });
        return noviTekst;
    }
    function decirilizator(tekst) {
        let noviTekst = tekst.replace(/њ|љ|џ|ђ|ћ|[а-ш]/gi, function (x) {
            if (!x) return x[0];
            let index = azbuka.indexOf(x.toLowerCase());
            return x[0] == x.toString()[0].toUpperCase() ? abeceda[index].toString().toUpperCase() : abeceda[index];
        });
        return noviTekst;
    }

    if (operacija === 'cirilica') {
        return cirilizator(tekst)
    } else if (operacija === 'latinica') {
        return decirilizator(tekst)
    }
}
export const alphabet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'č', 'ć', 'd', 'dž', 'đ', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'lj', 'm', 'n', 'nj', 'o', 'p', 'r', 's', 'š', 't', 'u', 'v', 'z', 'ž', 'а', 'б', 'ц', 'ч', 'ћ', 'д', 'џ', 'ђ', 'е', 'ф', 'г', 'х', 'и', 'ј', 'к', 'л', 'љ', 'м', 'н', 'њ', 'о', 'п', 'р', 'с', 'ш', 'т', 'у', 'в', 'з', 'ж' ];