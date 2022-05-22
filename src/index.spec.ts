import test from "ava";

import { codons, readGenes, translate } from "./index";

test("codons", (t) => {
    t.deepEqual(codons("AAATTTAAT"), ["AAA", "TTT", "AAT"]);
    t.deepEqual(codons("CGTTTCTGT"), ["CGT", "TTC", "TGT"]);
});

test("translate", (t) => {
    t.deepEqual(translate(["ATT", "GGC", "TGT", "AGA"]), [
        "Iso",
        "Gy",
        "Cy",
        "Ar",
    ]);
});

test("read", (t) => {
    t.deepEqual(
        readGenes([
            "Me",
            "Iso",
            "As",
            "Ar",
            "STOP",
            "Me",
            "Cy",
            "Al",
            "Gy",
            "STOP",
        ]),
        [
            ["Me", "Iso", "As", "Ar", "STOP"],
            ["Me", "Cy", "Al", "Gy", "STOP"],
        ]
    );
});
