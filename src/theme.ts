import { createMuiTheme } from '@material-ui/core'

const themeColors = {
  primary: {
    main: '#41c0bf',
  },
  error: {
    main: '#ff0000',
  },
}

const theme = createMuiTheme({
  palette: themeColors,
  overrides: {
    MuiTypography: {
      gutterBottom: {
        marginBottom: 30,
      },
    },
  },
})

export default theme
