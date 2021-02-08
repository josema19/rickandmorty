// Importar otros componentes
import Header from './components/Header/index';
import CountChart from './components/CountChar';
import ListCountCharacter from './components/ListCountCharacter';
import Alert from './components/Alert';
import Loading from './components/Loading';
import EmptyComponent from './components/EmptyComponent';

// Importar estilos
import './App.css';

// Importar state
import ChallengeState from './context/challengeState';

const App = () => (
  <ChallengeState>
    <div className="page">
      <header className="header">
        <Header />
      </header>
      <main className="main-container">
        <EmptyComponent />
        <Loading />
        <Alert />
        <CountChart />
        <ListCountCharacter />
      </main>
    </div>
  </ChallengeState>
);

export default App;
