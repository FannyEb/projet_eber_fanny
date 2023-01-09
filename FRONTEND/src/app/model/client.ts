export class Client{
    id: string = '';
    firstname: string = '';
    lastname: string= '';
    email: string= '';
    phone: string= '';
    address: string= '';
    city: string= '';
    codecity: string= '';
    country: string= '';
    login: string= '';
    password: string= '';
    confirmPassword: string= '';
    civility: string= '';

    isAllCompleted(): boolean {
        return this.firstname != '' &&
            this.lastname != '' &&
            this.email != '' &&
            this.phone != '' &&
            this.address != '' && 
            this.city != '' &&
            this.civility != '' &&
            this.codecity != '' &&
            this.country != '' &&
            this.login != '' &&
            this.password != '' &&
            this.confirmPassword != ''
    }

    isPasswordConfirm(): boolean {
        return this.password == this.confirmPassword
    }
}