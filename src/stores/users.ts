import {defineStore} from "pinia";
import {NewUser} from "../users.ts";
import {useRouter} from "vue-router";

interface UsersState {
    currentUserId?: string;
    error: string;
}

export const useUsers = defineStore("users", {
    state: (): UsersState => ({
        currentUserId: undefined,
        error: '',
    }),
    actions: {
        async authenticate() {
            try {
                const res = await window.fetch("/api/current-user", {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const result = await res.json();
                this.currentUserId = result.id;
            } catch (e) {
                this.currentUserId = undefined;
            }
        },
        async login(newUser: NewUser) {
            const body = JSON.stringify(newUser);
            const result = await window.fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body,
            });
            if ([401, 404].includes(result.status)) {
                this.error = "Username or password was incorrect.";
                return false;
            } else {
                this.error = "";
                await this.authenticate();
                return true;
            }
        },
        async logout() {
            await window.fetch("/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return this.authenticate();
        },
        async createUser(newUser: NewUser) {
            const body = JSON.stringify(newUser);
            await window.fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body,
            });
            return this.authenticate();
        },
    },
});