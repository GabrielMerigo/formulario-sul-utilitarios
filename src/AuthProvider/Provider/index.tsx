import AuthContext from '../contexts/AuthContext'

function AuthProvider({ children }){
  return (
    <AuthContext.Provider
      value={123}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider