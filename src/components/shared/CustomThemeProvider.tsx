import React from 'react'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3580ff',
        },
        secondary: {
            main: '#ff6243',
        },
        background: {
            default: '#f9f9f9',
        },
        // background: {
        //   default: "#eeeeee",
        //     paper: "#eeeeee"
        // },
        // secondary: {
        //     50: "#FBE9E7",
        //     100: "#FFCCBC",
        //     200: "#FFAB91",
        //     300: "#FF8A65",
        //     400: "#FF7043",
        //     500: "#FF5722",
        //     600: '#F4511E',
        //     700: '#E64A19',
        //     800: '#D84315',
        //     900: '#BF360C',
        //     A100: '#FF9E80',
        //     A200: '#FF6E40',
        //     A400: '#FF3D00',
        //     A700: '#DD2C00',
        // },
        // primary: {
        //     50: "#E3F2FD",
        //     100: "#BBDEFB",
        //     200: "#90CAF9",
        //     300: "#64B5F6",
        //     400: "#42A5F5",
        //     500: "#2196F3",
        //     600: '#1E88E5',
        //     700: '#1976D2',
        //     800: '#1565C0',
        //     900: '#0D47A1',
        //     A100: '#82B1FF',
        //     A200: '#448AFF',
        //     A400: '#2979FF',
        //     A700: '#2962FF',
        // }
    }
});

const CustomThemeProvider: React.FunctionComponent = (props: React.PropsWithChildren<{}>) => {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
}

export default CustomThemeProvider