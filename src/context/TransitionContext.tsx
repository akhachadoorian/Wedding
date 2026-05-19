import React, { createContext, useState } from 'react';

interface TransitionContextType {
    completed: boolean;
    toggleCompleted: (value: boolean) => void;
}

const TransitionContext = createContext<TransitionContextType>({
    completed: false,
    toggleCompleted: () => {},
});

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
    const [completed, setCompleted] = useState(false);
    const toggleCompleted = (value: boolean) => setCompleted(value);

    return (
        <TransitionContext.Provider value={{ toggleCompleted, completed }}>
            {children}
        </TransitionContext.Provider>
    );
};

export default TransitionContext;
