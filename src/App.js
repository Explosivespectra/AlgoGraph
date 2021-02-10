import {styles} from './themes.js';
import {Container, CssBaseline} from '@material-ui/core'
import {useState} from 'react';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import BodyContent from './components/BodyContent';

const App = () => {

  const [currentStyle, setStyle] = useState(styles.default);


  return (
    <ThemeProvider theme={createMuiTheme(currentStyle)}>
      <CssBaseline/>
      <Container maxWidth={false}>
        <BodyContent styles={styles} setStyle={(styleName) => {setStyle(styles[styleName])}}/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
