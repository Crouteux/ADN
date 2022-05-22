const CODONS = [
    ["Ph", "TTT", "TTC"],
    ["Le", "TTA", "TTG", "CTA", "CTC", "CTT", "CTG"],
    ["Iso", "ATT", "ATC", "ATA"],
    ["Me", "ATG"],
    ["Va", "GTA", "GTG", "GTC", "GTT"],
    ["Se", "TCA", "TCG", "TCT", "TCC", "AGT", "AGC"],
    ["Pr", "CCA", "CCG", "CCC", "CCT"],
    ["Th", "ACA", "ACG", "ACC", "ACT"],
    ["Al", "GCA", "GCG", "GCC", "GCT"],
    ["Ty", "TAT", "TAC"],
    ["Hi", "CAT", "CAC"],
    ["Gl", "CAA", "CAG"],
    ["As", "AAT", "AAC"],
    ["Ly", "AAA", "AAG"],
    ["Aa", "GAT", "GAC"],
    ["Ag", "GAA", "GAG"],
    ["Cy", "TGT", "TGC"],
    ["Tr", "TGG"],
    ["Ar", "CGA", "CGG", "CGC", "CGT", "AGA", "AGG"],
    ["Gy", "GGA", "GGG", "GGC", "GGT"],
    ["STOP", "TAA", "TAG", "TGA"],
];

type AminoAcid =
    | "Ph"
    | "Le"
    | "Iso"
    | "Me"
    | "Va"
    | "Se"
    | "Pr"
    | "Th"
    | "Al"
    | "Ty"
    | "Hi"
    | "Gl"
    | "As"
    | "Ly"
    | "Aa"
    | "Ag"
    | "Cy"
    | "Tr"
    | "Ar"
    | "Gy"
    | "STOP";
type Nucleotide = "A" | "T" | "G" | "C";
type Codons = `${Nucleotide}${Nucleotide}${Nucleotide}`;

/**
 * Transforme la séquence ADN en liste de codons
 * @param sequence Séquence ADN
 * @returns Liste de codons
 */
export const codons = (sequence: string): Codons[] => {
    const lst = [];
    for (let i = 0; i < sequence.length; i += 3) {
        lst.push(sequence.substring(i, i + 3) as Codons);
    }
    return lst;
};

/**
 * Associe un acide aminé à chaque codon
 * @param codons Liste de codons
 * @returns Liste d'acides aminés
 */
export const translate = (codons: Codons[]): AminoAcid[] => {
    const acids = [];
    codons.forEach((codon) => {
        CODONS.forEach((line) => {
            if (line.includes(codon)) {
                acids.push(line[0] as AminoAcid);
                return;
            }
        });
    });

    return acids;
};

/**
 * Sépare les acides aminés
 * @param acids Liste d'acides aminés
 * @returns Liste d'acides aminés séparée
 */
export const readGenes = (acids: AminoAcid[]): AminoAcid[][] => {
    const genes = [[]];
    acids.forEach((protein) => {
        genes[genes.length - 1].push(protein);
        if (protein === "STOP") genes.push([]);
    });
    genes.pop();
    return genes;
};

export const readAdn = (sequence: string) => {
    if (sequence.length % 3 != 0) return -1;
    const genes = readGenes(translate(codons(sequence)));

    console.log(genes);
    console.log(genes.length);
};
