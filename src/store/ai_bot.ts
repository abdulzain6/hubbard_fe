import { defineStore } from 'pinia'
import axios from '../axios'

export type BotResponseDto = {
    grade: string;
    message: string;
    best_response: string;
}

type UserResponse = {
    salesman_response: string;
    scenario_name: string;
}

export enum ChatTypeEnum {
    default = 'default',
    evaluate = 'evaluate'
}

interface Message {
    message: string;
    type: string;
    time: string;
    best_response?: string;
}

export type ChatSettings = { scenario: string; description: string; difficulty: string }

export const useAiBotStore = defineStore('ai_bot', {
    state: () => {
        return {
            ai_history: [] as string[],
            chat_messages: [] as Message[],
            bot_response: {} as BotResponseDto,
            chatType: 'default' as ChatTypeEnum,
            chatSettings: {
                scenario: '',
                description: '',
                difficulty: ''
            }
        }
    },
    actions: {
        updateAiChat(message: string) {
            this.ai_history.push(message)
        },
        async evaluateUserAnswer(UserResponse: UserResponse): Promise<BotResponseDto> {
            const { data } = await axios.post('/api/v1/scenarios/evaluate_scenario', UserResponse)
            this.bot_response = data
            return data
        },
        setChat(type: ChatTypeEnum, chatSettings: ChatSettings) {
            this.chatType = type
            this.chatSettings = chatSettings
        },
        updateEvaluationChatMessage(message: Message) {
            this.chat_messages.push(message)
        }
    }
})