import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export function uselogin() {
    const { dispatch } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(false);

    const login = async (email, password) => {
        setloading(true);
        setError('');

        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    'Content-Type': "application/json"
                }
            })
            const json = await response.json();
            if (response.ok) {
                localStorage.setItem('auth', JSON.stringify(json));
                dispatch({ type: 'login', payload: json });

            } else {
                setError(json.error)
            }
        } catch (error) {
            console.log(error.message)
            setError(error.message)
        }
        finally {
            setloading(false)
        }
    }
    return { login, loading, error };
}
