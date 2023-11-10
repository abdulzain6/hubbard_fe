import { defineStore } from 'pinia'

interface Message {
    message: string;
    type: string;
    time: string;
}

export const useDashboardStore = defineStore('dashboard', {
    state: () => {
        return {
            chat_messages: [] as Message[],
            chat_history: [] as string[][]
        }
    },
    actions: {
        updateChatMessages(message: Message) {
            this.chat_messages.push(message)
        },
        updateChatHistory(chat_messages: string[]) {
            this.chat_history.push(chat_messages)
        }
    }
})