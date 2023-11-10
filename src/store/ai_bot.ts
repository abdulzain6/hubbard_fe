import { defineStore } from 'pinia'

export const useAiBotStore = defineStore('ai_bot', {
    state: () => {
        return {
            ai_history: [] as string[],
            chat_history: [['','']]
        }
    },
    actions: {
        updateAiChat(message: string) {
            this.ai_history.push(message)
        }
    }
})