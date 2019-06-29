import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
// import { Provider } from 'react-redux';
// import store from 'store/createStore';
import theme from 'theme/theme';
import GlobalStyle from 'theme/globalStyle';
import { GameContainer, UIContainer } from 'components';
import { observable, computed, autorun, when } from 'mobx';
import { observer } from 'mobx-react';
import FakeClientEngine from 'engine/FakeClientEngine';
import MyClientEngine from 'engine/MyClientEngine';
import MyGameEngineV from 'engine/MyGameEngineV';
import { DEBUG_CS } from '@fortitan/shared/config/debug.csconfig';

const Wrapper = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  /* flex-direction: 'row'; */
  height: 100vh;
  color: white;
`;

class TodoList {
  @observable todos = [];

  @observable a = 1;

  @computed
  get unfinishedTodoCount() {
    console.log('update unfinishedTodoCount');
    return this.todos.filter(todo => !todo.finished).length;
  }
}

const test = new TodoList();
autorun(() => {
  console.log(`Tasks left: ${test.unfinishedTodoCount}`);
});

test.todos.push({ finished: false });
test.todos.push({ finished: false });

console.log(test.unfinishedTodoCount);
console.log(test.unfinishedTodoCount);

// create a client engine and a game engine
const gameEngine = new MyGameEngineV();

let clientEngine;

if (DEBUG_CS.fakeServer) {
  clientEngine = new FakeClientEngine(gameEngine);
} else {
  clientEngine = new MyClientEngine(gameEngine);
}

clientEngine.start();

const App = () => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <Wrapper>
        <UIContainer />
        <GameContainer clientEngine={clientEngine} />
      </Wrapper>
    </>
  </ThemeProvider>
);

export default App;
