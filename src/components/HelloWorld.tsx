import { useState } from 'react';

interface HelloWorldProps {
  msg: string;
}

const HelloWorld = ({ msg }: HelloWorldProps) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">{msg}</h1>

      <div className="card bg-card text-card-foreground p-8 rounded-lg shadow-lg mb-6">
        <button 
          type="button" 
          onClick={() => setCount(count + 1)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors mb-4"
        >
          count is {count}
        </button>
        <p className="text-muted-foreground">
          Edit{' '}
          <code className="bg-muted px-2 py-1 rounded text-sm">components/HelloWorld.tsx</code>
          {' '}to test HMR
        </p>
      </div>

      <p className="mb-4">
        Check out{' '}
        <a 
          href="https://react.dev/learn" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          React Docs
        </a>
        , the official React documentation
      </p>
      <p className="mb-4">
        Learn more about IDE Support for React in the{' '}
        <a
          href="https://react.dev/learn/editor-setup"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          React Editor Setup Guide
        </a>
        .
      </p>
      <p className="read-the-docs text-muted-foreground">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default HelloWorld;
