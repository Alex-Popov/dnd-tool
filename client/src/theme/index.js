//import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { createMuiTheme } from '@material-ui/core/styles';
import themeVariables from './variables.module.css';


export {
    themeVariables
};

export const themeConfig = createMuiTheme({
    palette: {
        primary: {
            main: themeVariables.primaryColor
        }
    },

});

export default {
    config: themeConfig,
    variables: themeVariables
}