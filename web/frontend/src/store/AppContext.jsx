import { createContext, useContext, useReducer } from 'react';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  profile: {
    degree: '',
    year: '',
    skills: [],
    interests: [],
    goal: '',
  },
  selectedDomain: null,
  quizResult: null,
  roadmap: null,
  skillGap: null,
  loading: false,
  currentStep: 0,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...initialState,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    case 'SET_PROFILE':
      return { ...state, profile: { ...state.profile, ...action.payload } };
    case 'SET_DOMAIN':
      return { ...state, selectedDomain: action.payload };
    case 'SET_QUIZ_RESULT':
      return { ...state, quizResult: action.payload };
    case 'SET_ROADMAP':
      return { ...state, roadmap: action.payload };
    case 'SET_SKILL_GAP':
      return { ...state, skillGap: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppState must be used within AppProvider');
  return context;
}
