import React from 'react';
import { EditorComponent, Remirror, ThemeProvider, useRemirror, useRemirrorContext } from '@remirror/react';
import {
  TableComponents,
	TableExtension,
} from '@remirror/extension-react-tables';
import '@remirror/styles/all.css';
import './App.css';

const CommandMenu: React.FC = () => {
  const { commands } = useRemirrorContext();
  const createTable = commands.createTable;

  return (
    <button
      onClick={() => createTable({ rowsCount: 3, columnsCount: 3, withHeaderRow: false })}
    >
      Insert table
    </button>
  );
};

function App() {
  const { manager, onChange, state } = useRemirror({
    extensions: () => [new TableExtension()],
    content: {"type":"doc","content":[{"type":"paragraph"}]},
  });

  return (
    <div className="App">
      <ThemeProvider>
        <Remirror manager={manager} onChange={onChange} state={state}>
          <EditorComponent />
          <TableComponents />
          <CommandMenu />
        </Remirror>
      </ThemeProvider>
    </div>
  );
}

export default App;
