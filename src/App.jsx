/*
  Name: Nguyen Dinh Viet
  Student Id: s3927291
*/

import { BrowserRouter } from 'react-router-dom';
import Navbar from './component/navbar/NavBar';
import RouteConfig from './router/RouteConfig';

function App() {
  return (
    <div className="App min-h-screen bg-gray-50 flex flex-col">
      <BrowserRouter>
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-8 py-8">
          <RouteConfig />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
