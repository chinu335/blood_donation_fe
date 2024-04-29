import { authLogin } from "@/services/authLogin";

const KEY_TOKEN = 'token';
const KEY_EMAIL = 'email';

const auth = {
    state : {
        token : localStorage.getItem( KEY_TOKEN ) || '',
        email : localStorage.getItem( KEY_EMAIL ) || '',
    },

    getters : {
        isAuthenticated( state ) {
            return !!state.token;
        }
    },

    mutations : {
        setToken( state, token) {
            state.token = token;
        },
        setEmail( state, email ) {
            state.email = email
        }

    },

    actions : {
        login( { commit }, credentails ) {
            return authLogin( credentails )
                .then( data => {
                    const { token, email } = data

                    localStorage.setItem( KEY_TOKEN, token );
                    localStorage.setItem( KEY_EMAIL, email );

                    commit( 'setToken', token );
                    commit( 'setEmail', email );

                });
        },

        logout( { commit } ) {
            localStorage.removeItem( KEY_TOKEN );
            localStorage.removeItem( KEY_EMAIL );

            commit( 'setToken', '');
            commit( 'setEmail', '');
            
            return Promise.resolve();
        }
    }
};

export default auth;