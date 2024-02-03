import {object, array, number, string, TypeOf} from 'zod';

const payload = {
    body: object({
        virtualBoard: array(array(
            object({
                player: string(),
                turn: number()
            })
        )),
        player: string(),
        result: string(),
    }),
}

export const gameStateSchema = object({
    ...payload,
});

export type gameState = TypeOf<typeof gameStateSchema>