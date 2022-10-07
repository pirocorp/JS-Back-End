import { IJwtUser } from '../interfaces/IJwtUser';

export async function login(username:string, password:string): Promise<IJwtUser> {
    return new Promise((res, rej) => {
        if(username.toLowerCase() == 'peter' && password == '123456'){
            res({
                _id: '12346bc512434adfee',
                username: 'peter',
                roles: ['user']
            });
        } else {
            rej(new Error('Incorect username or password'));
        }
    });
};

