import './App.less'
import { Provider } from 'react-redux';
import store from './store';
import AppRouter from './Router';

function App() {
  return (
      <Provider store={store}>
        <AppRouter/>
      </Provider>
  )
}
export default App
