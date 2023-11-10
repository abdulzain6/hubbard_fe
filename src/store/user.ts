import { defineStore } from "pinia";
import axios from '../axios'
import router from "@/router";
import { toast } from 'vue-sonner'
import * as jose from 'jose'

interface Register {
    email: string;
    password: string;
    name: string;
    country: string;
    phone: string;
}

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: {} as any,
            isLoggedIn: false,
            message: {} as { message: string; type: string },
            userChatHistory: [] as string[],
            scenario: {} as any,
            activeScenarios: [] as any
        }
    },
    actions: {
        async login(payload: { username: string; password: string }) {
            try {
                this.message = { message: '', type: '' }
                const response = await axios.post('/token', payload, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                const { access_token } = response.data
                this.user = response.data
                this.isLoggedIn = true
                if (response.data) {
                    const onLogin = await axios.get('/api/v1/users')
                    this.user = { ...this.user, profile: onLogin.data, ...this.decodeJWT(access_token) }
                    toast.success('Logged in succesfully!')
                }
                return await router.push('/dashboard')
            } catch (error: any) {
                toast.error(error.response.data.detail)
                return this.message = {
                    message: error.response.data.detail,
                    type: 'error'
                }
            }
        },
        async register(payload: Register) {
            try {
                this.message = { message: '', type: '' }
                const response = await axios.post('/api/v1/users/register', payload)

                if (response.data.status.includes('exist')) {
                    return this.message = {
                        message: response.data.status,
                        type: 'error'
                    }
                }
                this.message = {
                    message: response.data.status,
                    type: 'success'
                }
                Object.assign(payload, { email: '', password: '', name: '', country: '', phone: '' })
            } catch (error: any) {
                console.log(error)
                if (error.response.status === 422) {
                    if (error.response.data.detail[0].loc[1] === 'password') {
                        this.message = {
                            message: error.response.data.detail[0].msg,
                            type: 'error'
                        }
                        return false
                    }
                    return this.message = {
                        message: `Bad input format: ${error.response.data.detail[0].loc[1]}`,
                        type: 'error'
                    }
                }
                return this.message = {
                    message: error.response.data.detail,
                    type: 'error'
                }
            }
        },
        async updateUser(formData: { email: string; name: string; country: string; password: string; phone: string }) {
            try {
                await axios.post(`/api/v1/users/update_user/${formData.email}`, formData)
                
                toast.success('Your profile has been updated.')
            } catch (error) {
                toast.error('Error updating your profile.')
            }
        },
        async updateScenario(scenarioObject: any) {
            this.scenario = scenarioObject
        },
        setScenario(scenarioDetails: any) {
            this.scenario = scenarioDetails
        },
        async getAllScenarios() {
            const { data } = await axios.get('/api/v1/scenarios/get_all_scenarios')
            this.activeScenarios = data
        },
        setMessage(message: { message: string; type: string }) {
            this.message = message
        },
        updateUserChatHistory(message: string) {
            this.userChatHistory.push(message)
        },
        decodeJWT(token: string) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(escape(atob(base64)));
            return JSON.parse(jsonPayload);
        }
    }
})