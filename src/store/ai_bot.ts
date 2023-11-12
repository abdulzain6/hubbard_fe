import { defineStore } from 'pinia'
import axios from '../axios'

export type BotResponseDto = {
    grade: string;
    message: string;
    best_response: string;
}

export enum ChatTypeEnum {
    default = 'default',
    evaluate = 'evaluate'
}

export const useAiBotStore = defineStore('ai_bot', {
    state: () => {
        return {
            ai_history: [] as string[],
            chat_history: [['','']],
            bot_response: {} as BotResponseDto,
            chatType: 'default' as ChatTypeEnum
        }
    },
    actions: {
        updateAiChat(message: string) {
            this.ai_history.push(message)
        },
        async evaluateUserAnswer(userResponseDto: {
            scenario_name: string;
            salesman_response: string
        }) {
            const { data } = await axios.post('/api/v1/scenarios/evaluate_scenario', {
                data: {
                    userResponseDto
                }
            })
            this.bot_response = data
        }
    }
})