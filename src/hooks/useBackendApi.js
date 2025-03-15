import { createContext, useContext } from "react";

export const BackendApiEndpoint = createContext('http://localhost:4000');

export const useBackendApiEndpint = () => useContext(BackendApiEndpoint);