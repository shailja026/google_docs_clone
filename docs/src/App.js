
import './App.css';
import Editor from './component/Editor.js';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { v4 as uuid } from "uuid"
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Navigate replace to={`/docs/${uuid()}`} />} />
          <Route path='/docs/:id' element={<Editor />} />
        </Routes>

      </div>
    </BrowserRouter>

  );
}

export default App;
