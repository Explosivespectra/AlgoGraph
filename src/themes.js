import {orange, grey} from '@material-ui/core/colors'

const styles = {

    default: {
        palette: {
            background: {default: grey[900]},
        }
    },

    pop: {
        palette: {
            background: {default: grey[900]},
            primary: {
                main: orange[300],
            },
            secondary: {
              main: orange[500],
            },
          },
    }
};

export {styles};