import {orange, grey} from '@material-ui/core/colors'

const styles = {

    default: {
        palette: {
            //background: {default: grey[900]},
        }
    },

    monkeyinpain: {
        palette: {
            background: {
                default: grey[900],
                paper: grey[900],
            },
            primary: {
                main: "#e2b714",
            },
            text: {
                primary: "#e2b714",
                secondary: "#212121"
            },
          },
    },
    bumble: {
        palette: {
            background: {
                default: grey[900],
                paper: grey[900],
            },
            primary: {
                main: orange[300],
            },
            text: {
                primary: orange[300],
            },
          },
    },
    peachy: {
        palette: {  

            background: {
                default: "#EDD8BB",
                paper: "#EDD8BB",
            },
            primary: {
                main: "#E2AA87",
                contrastText: "#EDD8BB",
            },
            text: {
                primary: "#E2AA87",
            }
        }
    },
    boba: {
        palette: {  

            background: {
                default: "#EDD8BB",
                paper: "#EDD8BB",
            },
            primary: {
                main: grey[800],
                contrastText: "#EDD8BB",
            },
            text: {
                primary: grey[800],
            }
        }
    }
};

export {styles};