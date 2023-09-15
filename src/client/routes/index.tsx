import { ReactElement } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import layouts from "@layouts";
import Login from "@pages/Login";
import Account from "@pages/Account";
import Music from "@pages/Music";
import Session from "@pages/Session";
import RequireAuth from "@components/RequireAuth";
import Playlists from "@pages/Playlists";
import Bot from "@pages/Bot";
import PastaPlayer from "@components/PastaPlayer";
import SpotifyTest from "@pages/SpotifyTest";

const Router = (): ReactElement => (
  <BrowserRouter basename="/hub">
    <Routes>
      <Route path="session" element={<layouts.Hub />}>
        <Route path=":sessionId" element={<Session />} />
      </Route>

      <Route
        path=""
        element={
          <RequireAuth>
            <layouts.Hub />
          </RequireAuth>
        }
      >
        <Route path="" element={<Navigate to="music" />} />
        <Route path="account" element={<Account />} />
        <Route path="music" element={<Music />} />
        <Route path="spotify" element={<SpotifyTest />} />

        <Route path="playlists" element={<Playlists />} />
        <Route path="bot" element={<Bot />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>

    <PastaPlayer />
  </BrowserRouter>
);

export default Router;
