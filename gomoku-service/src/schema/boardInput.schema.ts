import {object, number, TypeOf} from 'zod';

const payload = {
    body: object({
        boardInput: number({
            required_error: 'Board dimension input is required'
        })
    }),
}

export const boardInputSchema = object({
    ...payload,
});

export type BoardInput = TypeOf<typeof boardInputSchema>