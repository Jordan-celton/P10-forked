// Importation des modules nécessaires
import { configureStore } from "@reduxjs/toolkit"; // Fonction pour configurer le store de Redux Toolkit
import authReducer from "./reducers/authReducer"; // Importation du reducer de l'authentification
import { persistStore, persistReducer } from "redux-persist"; // Fonctions pour persister l'état
import storage from "redux-persist/lib/storage"; // Utilisation de localStorage comme stockage persistant
import { combineReducers } from "redux"; // Permet de combiner plusieurs reducers

// Configuration de redux-persist
const persistConfig = {
  key: "root", // Clé utilisée pour stocker l'état dans localStorage
  storage, // Type de stockage utilisé (ici localStorage)
};

// Combinaison des reducers
const rootReducer = combineReducers({
  auth: authReducer, // Reducer pour l'authentification
});

// Création d'un reducer persistant en enveloppant rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuration du store Redux
const store = configureStore({
  reducer: persistedReducer, // Utilisation du reducer persistant
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Création d'un persistor pour gérer la persistance du store
export const persistor = persistStore(store);

// Exportation du store pour l'utiliser dans l'application
export default store;
