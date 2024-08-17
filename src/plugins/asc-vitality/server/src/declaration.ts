declare module '@Shared/types/character.js' {
    export interface Character {
        ascendedVitality: {
            hunger: number;
            thirst: number;
            pee: number;
            shower: number;
            shit: number;
        };
    }
}
