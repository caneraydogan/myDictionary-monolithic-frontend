import {base} from './environment';

const config = {
        waitTimeForModal: 2000,
        main: '/main/about',
        endpoints: {
            user: {
              login: `${base}/user/login`,
              register: `${base}/user/create`,
              update: `${base}/user/update`
            },
            EN: {
                entry: {
                    findAll: `${base}/english/findAll`,
                    findRandomEntry: `${base}/english/findRandomEntry`,
                    saveEntry: `${base}/english/saveEntry`,
                    updateEntry: `${base}/english/updateEntry`,
                    deleteEntry: `${base}/english/deleteEntry`,
                    updatePractice: `${base}/english/updatePractice`,
                    findEntryByWord: `${base}/english/findEntryByWord`,
                    findEntry: `${base}/english/findEntry`
                }
            },
            DE: {
                entry: {
                    findAll: `${base}/german/findAll`,
                    findRandomEntry: `${base}/german/findRandomEntry`,
                    saveEntry: `${base}/german/saveEntry`,
                    updateEntry: `${base}/german/updateEntry`,
                    deleteEntry: `${base}/german/deleteEntry`,
                    updatePractice: `${base}/german/updatePractice`,
                    findEntryByWord: `${base}/german/findEntryByWord`,
                    findEntry: `${base}/german/findEntry`
                }
            }
        },
        storage: {
            type: 'LOCAL',
            token: '',
            path: {
                login: 'login'
            }
        }
    }
;


export {base, config as default};
