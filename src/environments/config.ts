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
            entry: {
                findAll: `${base}/findAll`,
                findRandomEntry: `${base}/findRandomEntry`,
                saveEntry: `${base}/saveEntry`,
                updateEntry: `${base}/updateEntry`,
                deleteEntry: `${base}/deleteEntry`,
                updatePractice: `${base}/updatePractice`,
                findEntryByWord: `${base}/findEntryByWord`,
                findEntry: `${base}/findEntry`
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
